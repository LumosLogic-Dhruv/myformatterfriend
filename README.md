<<<<<<< HEAD
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
=======
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
>>>>>>> 7aacbbe4f803fc1f2b8c712a84a866a5032d3400
