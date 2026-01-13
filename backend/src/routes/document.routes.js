const express = require('express');
const { processDocument, downloadFile, getTemplates, uploadMiddleware, getModelStatus } = require('../controllers/document.controller');

const router = express.Router();

// Get available templates
router.get('/templates', getTemplates);

// Get current model status
router.get('/model-status', getModelStatus);

// Process document with multiple files and template file support
router.post('/process', uploadMiddleware, processDocument);

// Download generated file
router.get('/download/:fileName', downloadFile);

module.exports = router;
