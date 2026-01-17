import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileCode, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TemplateFileUploadProps {
  onTemplateUpload: (file: File | null) => void;
}

const TemplateFileUpload = ({ onTemplateUpload }: TemplateFileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedTemplate, setUploadedTemplate] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && isValidTemplateFile(file)) {
        setUploadedTemplate(file);
        onTemplateUpload(file);
      }
    },
    [onTemplateUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && isValidTemplateFile(file)) {
        setUploadedTemplate(file);
        onTemplateUpload(file);
      }
    },
    [onTemplateUpload]
  );

  const isValidTemplateFile = (file: File) => {
    // Accept any file type for template/format specification
    return true;
  };

  const removeTemplate = useCallback(() => {
    setUploadedTemplate(null);
    onTemplateUpload(null);
  }, [onTemplateUpload]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full"
    >
      <AnimatePresence mode="wait">
        {!uploadedTemplate ? (
          <motion.div
            key="template-upload-zone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer glass ${
              isDragging
                ? "border-secondary glow-secondary-strong scale-[1.01]"
                : "border-border hover:border-secondary/50"
            }`}
          >
            <input
              type="file"
              accept="*/*"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center text-center">
              <motion.div
                animate={{
                  y: isDragging ? -8 : 0,
                  scale: isDragging ? 1.1 : 1,
                }}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                  isDragging ? "bg-secondary text-secondary-foreground" : "bg-muted"
                }`}
              >
                <FileCode
                  className={`w-8 h-8 transition-colors ${
                    isDragging ? "text-secondary-foreground" : "text-muted-foreground"
                  }`}
                />
              </motion.div>
              <p className="text-lg font-semibold text-foreground mb-2">
                Upload Template/Format File
              </p>
              <p className="text-muted-foreground mb-4">
                Upload any file to use as template or format reference
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 bg-muted rounded text-muted-foreground font-medium">
                  ANY FILE
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="uploaded-template"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="border border-secondary/30 rounded-2xl p-4 glass"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <FileCode className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="font-medium text-foreground truncate max-w-[200px]">
                    {uploadedTemplate.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(uploadedTemplate.size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={removeTemplate}
                  className="w-8 h-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TemplateFileUpload;