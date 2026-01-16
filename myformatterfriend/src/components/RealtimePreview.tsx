import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Download, ExternalLink, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RealtimePreviewProps {
  htmlContent: string;
  isVisible: boolean;
  onEdit: () => void;
  onDownload: () => void;
  fileName?: string;
}

const RealtimePreview = ({ 
  htmlContent, 
  isVisible, 
  onEdit, 
  onDownload,
  fileName 
}: RealtimePreviewProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleEditHtml = () => {
    // Store HTML content in localStorage to avoid URL length limits
    localStorage.setItem('editorHtml', htmlContent);
    // Open HTML editor in new tab without URL parameters
    const editorUrl = `/html-editor`;
    window.open(editorUrl, '_blank');
  };

  const handlePreviewInNewTab = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    // Clean up the URL after a delay
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isVisible || !htmlContent) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${
        isFullscreen 
          ? 'fixed inset-0 z-50 bg-background' 
          : 'w-full'
      }`}
    >
      <div className={`${
        isFullscreen 
          ? 'h-full flex flex-col' 
          : 'glass rounded-2xl border border-border overflow-hidden'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-muted/50 border-b border-border">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Document Preview
            </h3>
            {fileName && (
              <span className="text-sm text-muted-foreground">
                ({fileName})
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-muted-foreground hover:text-foreground"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePreviewInNewTab}
              className="text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleEditHtml}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit HTML
            </Button>
            
            <Button
              size="sm"
              onClick={onDownload}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </div>

        {/* Preview Content */}
        <div className={`${
          isFullscreen 
            ? 'flex-1 overflow-hidden' 
            : 'h-96 md:h-[500px]'
        }`}>
          <iframe
            srcDoc={htmlContent}
            className="w-full h-full border-none bg-white"
            title="Document Preview"
            sandbox="allow-same-origin allow-scripts"
          />
        </div>

        {/* Footer for fullscreen mode */}
        {isFullscreen && (
          <div className="p-4 bg-muted/50 border-t border-border">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Real-time preview of your formatted document
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullscreen}
              >
                Exit Fullscreen
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RealtimePreview;