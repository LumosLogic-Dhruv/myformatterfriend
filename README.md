# MyFormatterFriend - AI Document Processor

An AI-powered document processing application that extracts text from uploaded documents, processes it with Google Gemini AI, and formats it into professional HTML templates.

## Features

- **Document Upload**: Support for PDF, DOCX, DOC, and TXT files
- **AI Text Extraction**: Automatic text extraction from various document formats
- **Gemini AI Processing**: Intelligent data extraction using Google's Gemini AI
- **Multiple Templates**: 6 professional HTML templates (Professional, Business, Minimal, Creative, Executive, Academic)
- **Real-time Processing**: Live processing status updates
- **Download & Export**: Export formatted documents as HTML files

## Project Structure

```
MyFormatterFriend/
├── backend/                 # Node.js Express backend
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic (AI, extraction, templates)
│   │   ├── routes/          # API routes
│   │   └── uploads/         # Temporary file storage
│   └── package.json
└── myformatterfriend/       # React frontend
    ├── src/
    │   ├── components/      # React components
    │   ├── pages/           # Page components
    │   └── hooks/           # Custom hooks
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Open `.env` file
   - Add your Gemini API key:
```
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=5000
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd myformatterfriend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Getting Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env` file

## Usage

1. **Upload Document**: Click the upload area and select a PDF, DOCX, DOC, or TXT file
2. **Select Template**: Choose from 6 available professional templates
3. **Process Document**: Click "Generate with AI" to start processing
4. **Review Results**: View extracted data and document preview
5. **Download**: Export the formatted HTML document

## API Endpoints

- `GET /api/document/templates` - Get available templates
- `POST /api/document/process` - Process document with AI
- `GET /api/document/download/:fileName` - Download generated file
- `GET /health` - Health check

## Supported File Types

- **PDF** (.pdf)
- **Microsoft Word** (.docx, .doc)
- **Plain Text** (.txt)

## Templates Available

1. **Professional** - Clean, corporate design
2. **Business** - Business proposal format
3. **Minimal** - Simple, clean layout
4. **Creative** - Colorful, modern design
5. **Executive** - Formal, executive summary style
6. **Academic** - Academic paper format

## Troubleshooting

### Common Issues

1. **"GEMINI_API_KEY is not configured"**
   - Ensure you've added your API key to the `.env` file
   - Restart the backend server after adding the key

2. **File upload fails**
   - Check file size (max 10MB)
   - Ensure file type is supported

3. **Processing fails**
   - Check your Gemini API key is valid
   - Ensure the document contains extractable text

### Development

To run both frontend and backend simultaneously:

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd myformatterfriend && npm run dev`

## Technologies Used

### Backend
- Node.js & Express
- Google Generative AI (Gemini)
- Multer (file uploads)
- Mammoth (DOCX processing)
- PDF-Parse (PDF processing)

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI Components
- Vite

## License

This project is for educational and personal use.