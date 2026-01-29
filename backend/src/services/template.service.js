// Pre-built templates for common document types
const TEMPLATES = {
  'professional-report': {
    id: 'professional-report',
    name: 'Professional Report',
    description: 'Clean, formal report layout with sections for summary, analysis, and recommendations',
    category: 'Business',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[TITLE]</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #f4f6f9; padding: 40px; }
    .report-container { max-width: 900px; margin: 0 auto; background: white; padding: 50px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .report-header { text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 30px; margin-bottom: 40px; }
    .report-header h1 { color: #1e293b; font-size: 2.2em; margin-bottom: 10px; }
    .report-meta { color: #64748b; font-size: 0.95em; }
    .section { margin: 35px 0; }
    .section-title { font-size: 1.4em; color: #1e293b; font-weight: 600; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0; }
    .content { color: #475569; line-height: 1.8; }
    .highlight-box { background: #f0f9ff; border-left: 4px solid #2563eb; padding: 20px; margin: 20px 0; border-radius: 4px; }
    .footer { text-align: center; margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 0.9em; }
  </style>
</head>
<body>
  <div class="report-container">
    <div class="report-header">
      <h1>[TITLE]</h1>
      <div class="report-meta">Generated on [DATE] | Professional Analysis Report</div>
    </div>
    <div class="section">
      <div class="section-title">Executive Summary</div>
      <div class="content">[SUMMARY]</div>
    </div>
    <div class="section">
      <div class="section-title">Key Findings</div>
      <div class="content">[KEY_DETAILS]</div>
    </div>
    <div class="section">
      <div class="section-title">Detailed Analysis</div>
      <div class="content">[ANALYSIS]</div>
    </div>
    <div class="section">
      <div class="section-title">Recommendations</div>
      <div class="content highlight-box">[RECOMMENDATIONS]</div>
    </div>
    <div class="footer">
      <p>This report was professionally formatted using AI</p>
    </div>
  </div>
</body>
</html>`
  },

  'seo-report': {
    id: 'seo-report',
    name: 'SEO Analysis Report',
    description: 'Comprehensive SEO audit template with metrics, scores, and improvement suggestions',
    category: 'Marketing',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SEO Analysis Report - [WEBSITE]</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body { font-family: 'Inter', system-ui, sans-serif; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); min-height: 100vh; padding: 40px; }
    .seo-container { max-width: 1000px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.3); }
    .seo-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
    .seo-header h1 { font-size: 2em; margin-bottom: 10px; }
    .score-card { display: inline-block; background: rgba(255,255,255,0.2); padding: 20px 40px; border-radius: 12px; margin-top: 20px; }
    .score-value { font-size: 3em; font-weight: bold; }
    .score-label { font-size: 0.9em; opacity: 0.9; }
    .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; padding: 30px; background: #f8fafc; }
    .metric-card { background: white; padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
    .metric-value { font-size: 1.8em; font-weight: bold; color: #667eea; }
    .metric-label { color: #64748b; font-size: 0.9em; margin-top: 5px; }
    .section { padding: 30px 40px; }
    .section-title { font-size: 1.3em; font-weight: 600; color: #1e293b; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
    .content { color: #475569; line-height: 1.8; }
    .issue-item { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 10px 0; border-radius: 4px; }
    .success-item { background: #f0fdf4; border-left: 4px solid #22c55e; padding: 15px; margin: 10px 0; border-radius: 4px; }
    .footer { background: #f8fafc; padding: 20px; text-align: center; color: #94a3b8; font-size: 0.85em; }
  </style>
</head>
<body>
  <div class="seo-container">
    <div class="seo-header">
      <h1>SEO Analysis Report</h1>
      <p>[WEBSITE]</p>
      <div class="score-card">
        <div class="score-value">[SEO_SCORE]</div>
        <div class="score-label">Overall SEO Score</div>
      </div>
    </div>
    <div class="metrics-grid">
      <div class="metric-card"><div class="metric-value">[PERFORMANCE_SCORE]</div><div class="metric-label">Performance</div></div>
      <div class="metric-card"><div class="metric-value">[ACCESSIBILITY_SCORE]</div><div class="metric-label">Accessibility</div></div>
      <div class="metric-card"><div class="metric-value">[BEST_PRACTICES]</div><div class="metric-label">Best Practices</div></div>
      <div class="metric-card"><div class="metric-value">[SEO_GRADE]</div><div class="metric-label">SEO Grade</div></div>
    </div>
    <div class="section">
      <div class="section-title">Key Findings</div>
      <div class="content">[KEY_FINDINGS]</div>
    </div>
    <div class="section">
      <div class="section-title">Issues Found</div>
      <div class="content">[ISSUES]</div>
    </div>
    <div class="section">
      <div class="section-title">Recommendations</div>
      <div class="content">[RECOMMENDATIONS]</div>
    </div>
    <div class="section">
      <div class="section-title">Technical Details</div>
      <div class="content">[TECHNICAL_DETAILS]</div>
    </div>
    <div class="footer">
      <p>Report generated on [DATE]</p>
    </div>
  </div>
</body>
</html>`
  },

  'resume': {
    id: 'resume',
    name: 'Professional Resume',
    description: 'Modern resume layout with sections for experience, skills, and education',
    category: 'Career',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[CANDIDATE_NAME] - Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #e2e8f0; padding: 40px; }
    .resume { max-width: 850px; margin: 0 auto; background: white; box-shadow: 0 10px 40px rgba(0,0,0,0.15); }
    .header { background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; padding: 50px; }
    .name { font-size: 2.5em; font-weight: 700; margin-bottom: 10px; }
    .title { font-size: 1.3em; opacity: 0.9; margin-bottom: 20px; }
    .contact { display: flex; flex-wrap: wrap; gap: 20px; font-size: 0.95em; opacity: 0.85; }
    .main-content { display: grid; grid-template-columns: 2fr 1fr; }
    .left-column { padding: 40px; }
    .right-column { background: #f8fafc; padding: 40px; }
    .section { margin-bottom: 35px; }
    .section-title { font-size: 1.2em; font-weight: 600; color: #1e293b; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 10px; border-bottom: 2px solid #2563eb; margin-bottom: 20px; }
    .content { color: #475569; line-height: 1.7; }
    .experience-item { margin-bottom: 25px; }
    .job-title { font-weight: 600; color: #1e293b; font-size: 1.1em; }
    .company { color: #2563eb; font-size: 0.95em; }
    .date { color: #94a3b8; font-size: 0.85em; margin-bottom: 10px; }
    .skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill-tag { background: #e0e7ff; color: #3730a3; padding: 6px 14px; border-radius: 20px; font-size: 0.85em; font-weight: 500; }
    .education-item { margin-bottom: 20px; }
    .degree { font-weight: 600; color: #1e293b; }
    .school { color: #64748b; font-size: 0.9em; }
  </style>
</head>
<body>
  <div class="resume">
    <div class="header">
      <div class="name">[CANDIDATE_NAME]</div>
      <div class="title">[PROFESSIONAL_TITLE]</div>
      <div class="contact">[CONTACT_INFO]</div>
    </div>
    <div class="main-content">
      <div class="left-column">
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <div class="content">[PROFESSIONAL_SUMMARY]</div>
        </div>
        <div class="section">
          <div class="section-title">Experience</div>
          <div class="content">[EXPERIENCE]</div>
        </div>
        <div class="section">
          <div class="section-title">Projects</div>
          <div class="content">[PROJECTS]</div>
        </div>
      </div>
      <div class="right-column">
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills-grid">[SKILLS]</div>
        </div>
        <div class="section">
          <div class="section-title">Education</div>
          <div class="content">[EDUCATION]</div>
        </div>
        <div class="section">
          <div class="section-title">Certifications</div>
          <div class="content">[CERTIFICATIONS]</div>
        </div>
        <div class="section">
          <div class="section-title">Languages</div>
          <div class="content">[LANGUAGES]</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
  },

  'meeting-notes': {
    id: 'meeting-notes',
    name: 'Meeting Notes',
    description: 'Organized meeting minutes with attendees, agenda, action items',
    category: 'Business',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meeting Notes - [MEETING_TITLE]</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body { font-family: 'Inter', system-ui, sans-serif; background: #f1f5f9; padding: 40px; }
    .meeting-doc { max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; }
    .meeting-header { background: #1e293b; color: white; padding: 35px; }
    .meeting-title { font-size: 1.8em; font-weight: 600; margin-bottom: 15px; }
    .meeting-meta { display: flex; flex-wrap: wrap; gap: 25px; font-size: 0.9em; opacity: 0.9; }
    .meta-item { display: flex; align-items: center; gap: 8px; }
    .section { padding: 30px 35px; border-bottom: 1px solid #e2e8f0; }
    .section:last-child { border-bottom: none; }
    .section-title { font-size: 1.15em; font-weight: 600; color: #1e293b; margin-bottom: 15px; }
    .content { color: #475569; line-height: 1.7; }
    .attendees-list { display: flex; flex-wrap: wrap; gap: 10px; }
    .attendee { background: #e0e7ff; color: #3730a3; padding: 8px 16px; border-radius: 20px; font-size: 0.9em; }
    .action-item { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 10px 0; border-radius: 4px; }
    .action-owner { font-weight: 600; color: #92400e; }
    .decision-item { background: #dcfce7; border-left: 4px solid #22c55e; padding: 15px; margin: 10px 0; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="meeting-doc">
    <div class="meeting-header">
      <div class="meeting-title">[MEETING_TITLE]</div>
      <div class="meeting-meta">
        <div class="meta-item">Date: [DATE]</div>
        <div class="meta-item">Time: [TIME]</div>
        <div class="meta-item">Location: [LOCATION]</div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">Attendees</div>
      <div class="attendees-list">[ATTENDEES]</div>
    </div>
    <div class="section">
      <div class="section-title">Agenda</div>
      <div class="content">[AGENDA]</div>
    </div>
    <div class="section">
      <div class="section-title">Discussion Summary</div>
      <div class="content">[DISCUSSION]</div>
    </div>
    <div class="section">
      <div class="section-title">Key Decisions</div>
      <div class="content">[DECISIONS]</div>
    </div>
    <div class="section">
      <div class="section-title">Action Items</div>
      <div class="content">[ACTION_ITEMS]</div>
    </div>
    <div class="section">
      <div class="section-title">Next Steps</div>
      <div class="content">[NEXT_STEPS]</div>
    </div>
  </div>
</body>
</html>`
  },

  'invoice': {
    id: 'invoice',
    name: 'Invoice',
    description: 'Professional invoice template with line items and totals',
    category: 'Finance',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice #[INVOICE_NUMBER]</title>
  <style>
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #f1f5f9; padding: 40px; }
    .invoice { max-width: 800px; margin: 0 auto; background: white; padding: 50px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .invoice-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 2px solid #e2e8f0; }
    .company-info h1 { color: #2563eb; font-size: 1.8em; margin-bottom: 5px; }
    .company-details { color: #64748b; font-size: 0.9em; line-height: 1.6; }
    .invoice-info { text-align: right; }
    .invoice-title { font-size: 2em; font-weight: 700; color: #1e293b; }
    .invoice-number { color: #64748b; margin-top: 5px; }
    .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
    .party-label { font-size: 0.85em; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
    .party-name { font-weight: 600; color: #1e293b; font-size: 1.1em; }
    .party-details { color: #64748b; font-size: 0.9em; line-height: 1.6; }
    .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    .items-table th { background: #f8fafc; color: #64748b; font-weight: 600; text-align: left; padding: 15px; font-size: 0.85em; text-transform: uppercase; }
    .items-table td { padding: 15px; border-bottom: 1px solid #e2e8f0; color: #475569; }
    .items-table .amount { text-align: right; font-weight: 500; }
    .totals { margin-left: auto; width: 280px; }
    .total-row { display: flex; justify-content: space-between; padding: 10px 0; color: #475569; }
    .total-row.final { font-size: 1.2em; font-weight: 700; color: #1e293b; border-top: 2px solid #1e293b; padding-top: 15px; margin-top: 10px; }
    .notes { background: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 30px; }
    .notes-title { font-weight: 600; color: #1e293b; margin-bottom: 10px; }
    .notes-content { color: #64748b; font-size: 0.9em; }
  </style>
</head>
<body>
  <div class="invoice">
    <div class="invoice-header">
      <div class="company-info">
        <h1>[COMPANY_NAME]</h1>
        <div class="company-details">[COMPANY_ADDRESS]</div>
      </div>
      <div class="invoice-info">
        <div class="invoice-title">INVOICE</div>
        <div class="invoice-number">#[INVOICE_NUMBER]</div>
        <div style="color: #64748b; margin-top: 10px;">Date: [DATE]</div>
        <div style="color: #64748b;">Due: [DUE_DATE]</div>
      </div>
    </div>
    <div class="parties">
      <div>
        <div class="party-label">Bill To</div>
        <div class="party-name">[CLIENT_NAME]</div>
        <div class="party-details">[CLIENT_ADDRESS]</div>
      </div>
      <div>
        <div class="party-label">Payment Details</div>
        <div class="party-details">[PAYMENT_DETAILS]</div>
      </div>
    </div>
    <table class="items-table">
      <thead>
        <tr><th>Description</th><th>Qty</th><th>Rate</th><th class="amount">Amount</th></tr>
      </thead>
      <tbody>[LINE_ITEMS]</tbody>
    </table>
    <div class="totals">
      <div class="total-row"><span>Subtotal</span><span>[SUBTOTAL]</span></div>
      <div class="total-row"><span>Tax</span><span>[TAX]</span></div>
      <div class="total-row final"><span>Total</span><span>[TOTAL]</span></div>
    </div>
    <div class="notes">
      <div class="notes-title">Notes</div>
      <div class="notes-content">[NOTES]</div>
    </div>
  </div>
</body>
</html>`
  }
};

exports.generateHTML = (customTemplate, data) => {
  if (!customTemplate) {
    throw new Error('HTML template is required');
  }

  let htmlContent = customTemplate;

  // Replace placeholders in the template with actual data
  if (data && typeof data === 'object') {
    Object.keys(data).forEach(key => {
      const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      const bracketPlaceholder = new RegExp(`\\[${key.toUpperCase()}\\]`, 'g');
      htmlContent = htmlContent.replace(placeholder, data[key] || '');
      htmlContent = htmlContent.replace(bracketPlaceholder, data[key] || '');
    });
  }

  return htmlContent;
};

exports.getAvailableTemplates = () => {
  return Object.values(TEMPLATES).map(template => ({
    id: template.id,
    name: template.name,
    description: template.description,
    category: template.category
  }));
};

exports.getTemplateById = (templateId) => {
  return TEMPLATES[templateId] || null;
};

exports.getTemplateHtml = (templateId) => {
  const template = TEMPLATES[templateId];
  return template ? template.html : null;
};

exports.TEMPLATES = TEMPLATES;
