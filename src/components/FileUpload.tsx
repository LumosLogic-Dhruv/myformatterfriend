import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileUpload: (file: File | null) => void;
}

const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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
      if (file && isValidFileType(file)) {
        setUploadedFile(file);
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && isValidFileType(file)) {
        setUploadedFile(file);
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const isValidFileType = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    return validTypes.includes(file.type);
  };

  const removeFile = useCallback(() => {
    setUploadedFile(null);
    onFileUpload(null);
  }, [onFileUpload]);

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
        {!uploadedFile ? (
          <motion.div
            key="upload-zone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-16 transition-all duration-300 cursor-pointer glass ${
              isDragging
                ? "border-primary glow-primary-strong scale-[1.01]"
                : "border-border hover:border-primary/50 border-glow-hover"
            }`}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center text-center">
              <motion.div
                animate={{
                  y: isDragging ? -8 : 0,
                  scale: isDragging ? 1.1 : 1,
                }}
                className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  isDragging ? "gradient-primary glow-primary-strong" : "bg-muted"
                }`}
              >
                <Upload
                  className={`w-9 h-9 transition-colors ${
                    isDragging ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                />
              </motion.div>
              <p className="text-xl font-semibold text-foreground mb-2">
                Drop your document here
              </p>
              <p className="text-muted-foreground mb-2">
                or click to browse from your computer
              </p>
              <p className="text-sm text-muted-foreground/70 mb-6">
                Upload without formatting changes
              </p>
              <div className="flex items-center gap-3 text-sm">
                <span className="px-3 py-1.5 bg-muted rounded-lg text-muted-foreground font-medium">PDF</span>
                <span className="px-3 py-1.5 bg-muted rounded-lg text-muted-foreground font-medium">DOC</span>
                <span className="px-3 py-1.5 bg-muted rounded-lg text-muted-foreground font-medium">DOCX</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="uploaded-file"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="border border-primary/30 rounded-2xl p-6 glass glow-primary"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center glow-primary">
                  <FileText className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground truncate max-w-[200px] md:max-w-[400px]">
                    {uploadedFile.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(uploadedFile.size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <CheckCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">Uploaded</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FileUpload;
