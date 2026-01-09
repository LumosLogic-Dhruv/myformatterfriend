const { extractFromAnyFile } = require('../services/extract.service');
const { analyzeDocument } = require('../services/ai.service');
const { generateHTML } = require('../services/template.service');
const fs = require('fs');
const path = require('path');

exports.processDocument = async (req, res) => {
  try {
    const file = req.file;
    const { htmlTemplate, directText, outputFormat } = req.body;
    
    let text = '';
    
    // Handle different input types
    if (directText && directText.trim()) {
      // User pasted text directly
      text = directText.trim();
      console.log('Using direct text input, length:', text.length);
    } else if (file) {
      // User uploaded a file
      text = await extractFromAnyFile(file.path, file.mimetype, file.originalname);
      console.log('Extracted text length:', text.length);
      console.log('First 500 characters of extracted text:', text.substring(0, 500));
      
      // Clean up uploaded file
      fs.unlinkSync(file.path);
    } else {
      return res.status(400).json({ error: 'Either upload a file or provide text input' });
    }

    if (!text.trim()) {
      return res.status(400).json({ error: 'No text content provided' });
    }

    let finalHtml;
    
    if (htmlTemplate && htmlTemplate.trim()) {
      // User provided HTML template
      finalHtml = await analyzeDocument(text, htmlTemplate);
    } else if (outputFormat && outputFormat.trim()) {
      // User specified output format, generate custom template
      const customTemplate = generateCustomTemplate(outputFormat);
      finalHtml = await analyzeDocument(text, customTemplate);
    } else {
      return res.status(400).json({ error: 'Either provide HTML template or specify output format' });
    }

    // Save HTML file
    const outputDir = path.join(__dirname, '../outputs');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const fileName = `formatted_${Date.now()}.html`;
    const outputPath = path.join(outputDir, fileName);
    fs.writeFileSync(outputPath, finalHtml);

    res.json({
      success: true,
      htmlContent: finalHtml,
      downloadUrl: `/api/document/download/${fileName}`,
      fileName,
      extractedText: text.substring(0, 500) + '...' // Preview of extracted text
    });
  } catch (error) {
    // Clean up uploaded file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    console.error('Document processing error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Generate custom template based on user's desired output format
const generateCustomTemplate = (outputFormat) => {
  const format = outputFormat.toLowerCase();
  
  if (format.includes('candidate') || format.includes('profile') || format.includes('resume')) {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Candidate Profile Report</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 40px; background: #f8f9fa; }
        .container { max-width: 900px; margin: 0 auto; background: white; padding: 50px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 3px solid #2c3e50; }
        .name { font-size: 2.5em; font-weight: bold; color: #2c3e50; margin-bottom: 10px; }
        .title { font-size: 1.3em; color: #7f8c8d; margin-bottom: 20px; }
        .contact { color: #34495e; font-size: 1.1em; }
        .section { margin: 35px 0; }
        .section-title { font-size: 1.4em; font-weight: bold; color: #2c3e50; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #3498db; }
        .content { line-height: 1.7; color: #2c3e50; }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px; }
        .skill-item { background: #ecf0f1; padding: 10px 15px; border-radius: 6px; font-weight: 500; }
        .achievement { background: #e8f6f3; padding: 15px; border-left: 4px solid #27ae60; margin: 10px 0; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="name">[CANDIDATE_NAME]</div>
            <div class="title">[PROFESSIONAL_TITLE]</div>
            <div class="contact">[CONTACT_INFO]</div>
        </div>
        
        <div class="section">
            <div class="section-title">Professional Summary</div>
            <div class="content">[PROFESSIONAL_SUMMARY]</div>
        </div>
        
        <div class="section">
            <div class="section-title">Technical Skills</div>
            <div class="content">
                <div class="skills-grid">[TECHNICAL_SKILLS]</div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">Experience & Projects</div>
            <div class="content">[EXPERIENCE_PROJECTS]</div>
        </div>
        
        <div class="section">
            <div class="section-title">Education</div>
            <div class="content">[EDUCATION]</div>
        </div>
        
        <div class="section">
            <div class="section-title">Key Achievements</div>
            <div class="content">
                <div class="achievement">[ACHIEVEMENTS]</div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">Languages & Additional Skills</div>
            <div class="content">[LANGUAGES_ADDITIONAL]</div>
        </div>
    </div>
</body>
</html>`;
  }
  
  if (format.includes('seo') || format.includes('website')) {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>SEO Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 1000px; margin: 0 auto; background: white; padding: 40px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 3px solid #007bff; padding-bottom: 20px; margin-bottom: 30px; }
        .section { margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; }
        .metric { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd; }
        .score { font-weight: bold; color: #007bff; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>SEO Analysis Report</h1>
            <p>Comprehensive website performance analysis</p>
        </div>
        
        <div class="section">
            <h2>Website Overview</h2>
            <div class="metric"><span>Website:</span><span class="score">[WEBSITE_NAME]</span></div>
            <div class="metric"><span>Overall Grade:</span><span class="score">[SEO_GRADE]</span></div>
            <div class="metric"><span>SEO Score:</span><span class="score">[SEO_SCORE]</span></div>
        </div>
        
        <div class="section">
            <h2>Key Findings</h2>
            <p>[KEY_FINDINGS]</p>
        </div>
        
        <div class="section">
            <h2>Recommendations</h2>
            <p>[RECOMMENDATIONS]</p>
        </div>
        
        <div class="section">
            <h2>Technical Analysis</h2>
            <p>[TECHNICAL_DETAILS]</p>
        </div>
    </div>
</body>
</html>`;
  }
  
  // Default professional report template
  return `
<!DOCTYPE html>
<html>
<head>
    <title>${outputFormat} Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f9f9f9; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #333; }
        .section { margin: 30px 0; }
        .section-title { font-size: 1.3em; font-weight: bold; color: #333; margin-bottom: 15px; padding-bottom: 5px; border-bottom: 1px solid #ddd; }
        .content { line-height: 1.6; color: #555; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${outputFormat}</h1>
            <p>Professional Analysis Report</p>
        </div>
        
        <div class="section">
            <div class="section-title">Executive Summary</div>
            <div class="content">[SUMMARY]</div>
        </div>
        
        <div class="section">
            <div class="section-title">Key Details</div>
            <div class="content">[KEY_DETAILS]</div>
        </div>
        
        <div class="section">
            <div class="section-title">Analysis</div>
            <div class="content">[ANALYSIS]</div>
        </div>
        
        <div class="section">
            <div class="section-title">Recommendations</div>
            <div class="content">[RECOMMENDATIONS]</div>
        </div>
    </div>
</body>
</html>`;
};

exports.downloadFile = async (req, res) => {
  try {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, '../outputs', fileName);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({ error: 'Error downloading file' });
      }
    });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getTemplates = (req, res) => {
  const { getAvailableTemplates } = require('../services/template.service');
  res.json({
    success: true,
    templates: getAvailableTemplates()
  });
};
