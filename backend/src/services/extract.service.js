const mammoth = require("mammoth");
const fs = require("fs");
const xlsx = require('xlsx');
const path = require('path');
const pdfParse = require('pdf-parse-fork');

exports.extractFromDocx = async (filePath) => {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (error) {
    throw new Error(`Error extracting DOCX: ${error.message}`);
  }
};

exports.extractFromPdf = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('PDF extraction error:', error);
    // Fallback: try to read as text
    try {
      const buffer = fs.readFileSync(filePath);
      const text = buffer.toString('utf8');
      if (text && text.trim().length > 100) {
        return text;
      }
    } catch (e) {
      // Ignore fallback error
    }
    throw new Error(`Error extracting PDF: ${error.message}`);
  }
};

exports.extractFromTxt = async (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    throw new Error(`Error reading TXT file: ${error.message}`);
  }
};

exports.extractFromExcel = async (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath);
    let text = '';
    
    workbook.SheetNames.forEach(sheetName => {
      const sheet = workbook.Sheets[sheetName];
      const sheetText = xlsx.utils.sheet_to_txt(sheet);
      text += `Sheet: ${sheetName}\n${sheetText}\n\n`;
    });
    
    return text;
  } catch (error) {
    throw new Error(`Error extracting Excel: ${error.message}`);
  }
};

// Extract from multiple files
exports.extractFromMultipleFiles = async (files) => {
  let combinedText = '';
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      const text = await exports.extractFromAnyFile(file.path, file.mimetype, file.originalname);
      combinedText += `\n\n=== FILE ${i + 1}: ${file.originalname} ===\n${text}\n`;
    } catch (error) {
      combinedText += `\n\n=== FILE ${i + 1}: ${file.originalname} (ERROR) ===\nFailed to extract: ${error.message}\n`;
    }
  }
  
  return combinedText;
};

exports.extractFromAnyFile = async (filePath, mimetype, originalname) => {
  const ext = path.extname(originalname).toLowerCase();
  
  try {
    // Excel files
    if (ext === '.xlsx' || ext === '.xls' || mimetype.includes('spreadsheet')) {
      return await exports.extractFromExcel(filePath);
    }
    
    // Word documents
    if (ext === '.docx' || ext === '.doc' || mimetype.includes('word')) {
      return await exports.extractFromDocx(filePath);
    }
    
    // PDF files
    if (ext === '.pdf' || mimetype.includes('pdf')) {
      return await exports.extractFromPdf(filePath);
    }
    
    // Text files
    if (ext === '.txt' || mimetype.includes('text')) {
      return await exports.extractFromTxt(filePath);
    }
    
    // HTML files (for templates)
    if (ext === '.html' || ext === '.htm' || mimetype.includes('html')) {
      return await exports.extractFromTxt(filePath);
    }
    
    // Try to read as text for any other file
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content && content.trim().length > 0) {
        return content;
      }
    } catch (e) {
      // If UTF-8 fails, try binary read and convert
      const buffer = fs.readFileSync(filePath);
      return buffer.toString('utf8', 0, Math.min(buffer.length, 50000)); // First 50KB
    }
    
    throw new Error('Unable to extract readable text from this file type');
  } catch (error) {
    throw new Error(`File extraction failed: ${error.message}`);
  }
};
