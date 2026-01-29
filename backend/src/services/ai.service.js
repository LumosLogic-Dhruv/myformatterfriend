const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

let genAI = null;

// Initialize Gemini AI only when API key is available
const initializeGenAI = () => {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
};

// Global variable to track current model being used
let currentModel = 'gemini-1.5-flash';

// Model limits dictionary - Using ACTUAL existing Gemini models
const MODEL_LIMITS = {
  'gemini-1.5-flash': { rpm: 15, tpm: '1M', rpd: 1500 },
  'gemini-1.5-flash-8b': { rpm: 15, tpm: '1M', rpd: 1500 },
  'gemini-1.5-pro': { rpm: 2, tpm: '32K', rpd: 50 },
  'gemini-2.0-flash-exp': { rpm: 10, tpm: '1M', rpd: 1500 },
  'gemini-1.0-pro': { rpm: 15, tpm: '32K', rpd: 1500 },
  'text-based-fallback': { rpm: 'unlimited', tpm: 'N/A', rpd: 'unlimited' }
};

exports.getCurrentModel = () => currentModel;

exports.getModelLimits = () => {
  const limits = MODEL_LIMITS[currentModel];
  return {
    model: currentModel,
    limits: limits || { rpm: 'N/A', tpm: 'N/A', rpd: 'N/A' }
  };
};

exports.analyzeDocument = async (text, htmlTemplate) => {
  // Using ACTUAL existing Gemini models in priority order
  const models = [
    { name: "gemini-1.5-flash", priority: 1 },      // Fast, capable, high rate limits
    { name: "gemini-1.5-flash-8b", priority: 2 },   // Lighter version
    { name: "gemini-2.0-flash-exp", priority: 3 },  // Experimental but fast
    { name: "gemini-1.5-pro", priority: 4 },        // More capable but lower limits
    { name: "gemini-1.0-pro", priority: 5 }         // Fallback stable model
  ];

  try {
    console.log('=== AI SERVICE DEBUG ===');
    console.log('GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);
    console.log('GEMINI_API_KEY starts with AIza:', process.env.GEMINI_API_KEY?.startsWith('AIza'));
    console.log('Initial model set to:', currentModel);

    if (!process.env.GEMINI_API_KEY) {
      console.log('No API key found, using text-based fallback');
      throw new Error('GEMINI_API_KEY is not configured');
    }

    if (!process.env.GEMINI_API_KEY.startsWith('AIza')) {
      console.log('Invalid API key format, using text-based fallback');
      throw new Error('Invalid GEMINI_API_KEY format. It should start with "AIza"');
    }

    // Initialize GenAI
    const ai = initializeGenAI();
    if (!ai) {
      throw new Error('Failed to initialize Gemini AI');
    }

    const prompt = `
You are a professional document formatter, content analyst, and HTML structuring expert.

Your task is to transform raw extracted content into a clean, complete, and professional HTML document based strictly on the provided output format.

CRITICAL OUTPUT RULES (MANDATORY):
- Return ONLY the final HTML document
- Do NOT include explanations, comments, introductions, or summaries
- Do NOT wrap the output in markdown code blocks
- Do NOT add conversational phrases or confirmations
- The response must start with <!DOCTYPE html> or <html> and end with </html>

CONTENT ANALYSIS INSTRUCTIONS:
You are given extracted content from one or more documents. You must:
- Preserve ALL meaningful information (no omissions)
- Identify headings, sections, lists, tables, and key data points
- Maintain logical hierarchy and relationships between content
- Normalize inconsistent formatting from the source text
- Avoid hallucinating or inventing information

EXTRACTED CONTENT:
${text}

OUTPUT FORMAT REQUIREMENTS:
${htmlTemplate}

HTML STRUCTURE & QUALITY RULES:
- Follow the provided HTML template or format description strictly
- Use semantic HTML elements wherever appropriate (header, section, article, table, ul, li, footer, etc.)
- For styling, you can use CDN libraries like Bootstrap, Tailwind CSS, or custom CSS
- Include CDN links in the <head> section if using external libraries
- Ensure consistent indentation and clean structure
- Ensure the document is valid, complete, and ready for direct web use
- If some content does not clearly fit the template, place it in the most logically relevant section without discarding it

STYLING OPTIONS:
- You may use Bootstrap CDN: https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css
- You may use Tailwind CDN: https://cdn.tailwindcss.com
- You may write custom CSS in <style> tags for professional appearance
- Apply modern, clean, and professional styling
- Use proper colors, spacing, typography, and layout
- Make the document visually appealing and easy to read

ACCESSIBILITY & READABILITY:
- Use proper heading hierarchy (h1 to h2 to h3)
- Ensure readable structure and clear separation of sections
- Avoid unnecessary repetition
- Use appropriate contrast and font sizes

FINAL TASK:
1. Analyze all extracted content thoroughly
2. Map content accurately to the required HTML structure
3. Apply professional styling using CSS or CDN libraries
4. Ensure completeness, clarity, and professional formatting
5. Return ONLY the final, production-ready HTML document

Generate the final HTML document now:
`;

    // Try Gemini models in priority order
    for (const modelInfo of models) {
      try {
        console.log(`Trying ${modelInfo.name} (priority ${modelInfo.priority})...`);
        currentModel = modelInfo.name;
        const model = ai.getGenerativeModel({ model: modelInfo.name });
        
        const result = await model.generateContent(prompt);
        const response = result.response.text();
        
        console.log(`Success with ${modelInfo.name}`);
        
        // Clean up the response
        let cleanedResponse = response.trim();
        
        if (cleanedResponse.startsWith('```html')) {
          cleanedResponse = cleanedResponse.replace(/```html\s*/, '').replace(/\s*```$/, '');
        } else if (cleanedResponse.startsWith('```')) {
          cleanedResponse = cleanedResponse.replace(/```\s*/, '').replace(/\s*```$/, '');
        }
        
        return cleanedResponse;
      } catch (modelError) {
        console.log(`${modelInfo.name} failed:`, modelError.message);
        
        // If rate limited, wait and try once more
        if (modelError.status === 429 && modelInfo.priority === 1) {
          console.log('Rate limited on primary model, waiting 2 seconds...');
          await new Promise(resolve => setTimeout(resolve, 2000));
          try {
            const model = ai.getGenerativeModel({ model: modelInfo.name });
            const result = await model.generateContent(prompt);
            const response = result.response.text();
            console.log(`Success with ${modelInfo.name} after retry`);
            
            let cleanedResponse = response.trim();
            if (cleanedResponse.startsWith('```html')) {
              cleanedResponse = cleanedResponse.replace(/```html\s*/, '').replace(/\s*```$/, '');
            } else if (cleanedResponse.startsWith('```')) {
              cleanedResponse = cleanedResponse.replace(/```\s*/, '').replace(/\s*```$/, '');
            }
            return cleanedResponse;
          } catch (retryError) {
            console.log(`${modelInfo.name} retry also failed, trying next model...`);
          }
        }
        
        // Continue to next model
        continue;
      }
    }
    
    currentModel = 'text-based-fallback';
    throw new Error('All Gemini models failed');
    
  } catch (error) {
    console.error('AI analysis error:', error);
    currentModel = 'text-based-fallback';

    // If all AI models fail, create a comprehensive text-based HTML document
    console.log('All Gemini models failed, using text-based processing...');
    console.log('Template length:', htmlTemplate?.length || 0);
    console.log('Text length:', text?.length || 0);

    // Extract meaningful content from the text
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    const contentLines = lines.filter(line => line.trim().length > 10);

    // Try to find key information
    const titleMatch = text.match(/^[#\s]*(.+)/m);
    const title = titleMatch ? titleMatch[1].trim().substring(0, 100) : 'Formatted Document';

    // Extract sections based on common patterns
    const sections = [];
    let currentSection = { title: 'Overview', content: [] };

    for (const line of contentLines) {
      // Check if this looks like a heading
      if (line.match(/^(#{1,3}\s|[A-Z][A-Za-z\s]+:$|===|---)/) ||
          (line.length < 60 && line.toUpperCase() === line && line.length > 3)) {
        if (currentSection.content.length > 0) {
          sections.push(currentSection);
        }
        currentSection = {
          title: line.replace(/^#+\s*/, '').replace(/[:=\-]+$/, '').trim(),
          content: []
        };
      } else {
        currentSection.content.push(line.trim());
      }
    }
    if (currentSection.content.length > 0) {
      sections.push(currentSection);
    }

    // If we have a template with placeholders, try to fill them
    if (htmlTemplate && htmlTemplate.includes('[')) {
      let filledHtml = htmlTemplate;
      const hasBracketPlaceholders = /\[[A-Z_]+\]/g;

      // Generic placeholder replacement
      const placeholderMap = {
        'TITLE': title,
        'NAME': title,
        'SUMMARY': sections[0]?.content.slice(0, 3).join(' ') || 'Document summary',
        'CONTENT': contentLines.slice(0, 20).join('<br>'),
        'DATE': new Date().toLocaleDateString(),
        'KEY_DETAILS': sections.slice(0, 2).map(s => `<p><strong>${s.title}:</strong> ${s.content.slice(0, 2).join(' ')}</p>`).join(''),
        'ANALYSIS': contentLines.slice(0, 10).join('<br>'),
        'RECOMMENDATIONS': contentLines.filter(l => l.toLowerCase().includes('recommend') || l.includes('should')).slice(0, 5).join('<br>') || 'See document content for details.'
      };

      for (const [key, value] of Object.entries(placeholderMap)) {
        filledHtml = filledHtml.replace(new RegExp(`\\[${key}[^\\]]*\\]`, 'gi'), value);
      }

      // Replace remaining placeholders with content
      filledHtml = filledHtml.replace(/\[[A-Z_]+\]/g, (match) => {
        return contentLines.slice(0, 3).join('<br>') || 'Content processed';
      });

      return filledHtml;
    }

    // Generate a complete HTML document from scratch
    const sectionsHtml = sections.slice(0, 10).map(section => `
      <section class="section">
        <h2>${escapeHtml(section.title)}</h2>
        <div class="content">
          ${section.content.map(line => `<p>${escapeHtml(line)}</p>`).join('')}
        </div>
      </section>
    `).join('');

    const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 40px 20px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      padding: 50px;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 3px solid #667eea;
    }
    .header h1 {
      color: #333;
      font-size: 2.2em;
      margin-bottom: 10px;
    }
    .header .subtitle {
      color: #666;
      font-size: 1.1em;
    }
    .section {
      margin: 30px 0;
      padding: 25px;
      background: #f8f9fa;
      border-radius: 12px;
      border-left: 4px solid #667eea;
    }
    .section h2 {
      color: #333;
      font-size: 1.4em;
      margin-bottom: 15px;
    }
    .section p {
      color: #555;
      line-height: 1.7;
      margin-bottom: 10px;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      color: #888;
      font-size: 0.9em;
    }
    .badge {
      background: #667eea;
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.85em;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${escapeHtml(title)}</h1>
      <p class="subtitle">Formatted Document</p>
      <span class="badge">Generated on ${new Date().toLocaleDateString()}</span>
    </div>

    ${sectionsHtml || `
    <section class="section">
      <h2>Document Content</h2>
      <div class="content">
        ${contentLines.slice(0, 30).map(line => `<p>${escapeHtml(line)}</p>`).join('')}
      </div>
    </section>
    `}

    <div class="footer">
      <p>Document processed by MyFormatterFriend</p>
      <p>Note: AI processing was unavailable. This is a text-based formatted output.</p>
    </div>
  </div>
</body>
</html>`;

    console.log('Generated fallback HTML:', fallbackHtml.length, 'characters');
    return fallbackHtml;
  }
};

// Helper function to escape HTML special characters
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
