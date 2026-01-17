import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Eye, Download, Copy, RotateCcw } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const HtmlEditor = () => {
  const [searchParams] = useSearchParams();
  const [htmlCode, setHtmlCode] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    // Get HTML content from URL params or localStorage
    const htmlFromParams = searchParams.get('html');
    const htmlFromStorage = localStorage.getItem('editorHtml');
    
    if (htmlFromParams) {
      const decodedHtml = decodeURIComponent(htmlFromParams);
      setHtmlCode(decodedHtml);
      localStorage.setItem('editorHtml', decodedHtml);
    } else if (htmlFromStorage) {
      setHtmlCode(htmlFromStorage);
    }
  }, [searchParams]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setHtmlCode(newCode);
    localStorage.setItem('editorHtml', newCode);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `edited_document_${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlCode);
      alert('HTML code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the code? This will restore the original version.')) {
      const originalHtml = searchParams.get('html');
      if (originalHtml) {
        const decodedHtml = decodeURIComponent(originalHtml);
        setHtmlCode(decodedHtml);
        localStorage.setItem('editorHtml', decodedHtml);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full py-4 px-6 glass-strong border-b border-border sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Code className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold text-foreground">HTML Editor</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isPreviewMode 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              <Eye className="w-4 h-4" />
              {isPreviewMode ? 'Edit' : 'Preview'}
            </button>
            
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
            
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Code Editor */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${isPreviewMode ? 'w-1/2' : 'w-full'} border-r border-border transition-all duration-300`}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 bg-muted/50 border-b border-border">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Code className="w-4 h-4" />
                HTML Code Editor
              </h3>
            </div>
            <textarea
              value={htmlCode}
              onChange={handleCodeChange}
              className="flex-1 w-full p-4 bg-gray-900 text-green-400 font-mono text-sm resize-none focus:outline-none"
              placeholder="Paste your HTML code here..."
              spellCheck={false}
            />
          </div>
        </motion.div>

        {/* Live Preview */}
        {isPreviewMode && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-1/2 flex flex-col"
          >
            <div className="p-4 bg-muted/50 border-b border-border">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Live Preview
              </h3>
            </div>
            <div className="flex-1 overflow-auto bg-white">
              <iframe
                srcDoc={htmlCode}
                className="w-full h-full border-none"
                title="HTML Preview"
                sandbox="allow-same-origin"
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HtmlEditor;