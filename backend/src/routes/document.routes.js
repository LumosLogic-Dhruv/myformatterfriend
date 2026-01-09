const express = require('express');
const multer = require('multer');
const { processDocument, downloadFile, getTemplates } = require('../controllers/document.controller');

const router = express.Router();

const upload = multer({
  dest: 'src/uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    // Accept most common file types
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
      'text/csv'
    ];
    
    const allowedExtensions = ['.pdf', '.docx', '.doc', '.xlsx', '.xls', '.txt', '.csv'];
    const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
    
    if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(null, true); // Accept all files and handle extraction in the service
    }
  }
});

// Get available templates
router.get('/templates', getTemplates);

// Process document with optional file upload
router.post('/process', upload.single('file'), processDocument);

// Download generated file
router.get('/download/:fileName', downloadFile);

// Legacy upload endpoint (for compatibility)
router.post('/upload', upload.single('file'), (req, res) => {
  res.json({
    success: true,
    file: req.file,
    message: 'File uploaded successfully. Use /process endpoint for full processing.'
  });
});

module.exports = router;
