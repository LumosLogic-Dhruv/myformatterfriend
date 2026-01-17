import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
}

const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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
      const files = Array.from(e.dataTransfer.files).filter(isValidFileType);
      if (files.length > 0) {
        const newFiles = [...uploadedFiles, ...files];
        setUploadedFiles(newFiles);
        onFileUpload(newFiles);
      }
    },
    [onFileUpload, uploadedFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []).filter(isValidFileType);
      if (files.length > 0) {
        const newFiles = [...uploadedFiles, ...files];
        setUploadedFiles(newFiles);
        onFileUpload(newFiles);
      }
    },
    [onFileUpload, uploadedFiles]
  );

  const isValidFileType = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
      "text/html"
    ];
    const validExtensions = ['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx', '.html', '.htm'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    return validTypes.includes(file.type) || validExtensions.includes(fileExtension);
  };

  const removeFile = useCallback((index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onFileUpload(newFiles);
  }, [onFileUpload, uploadedFiles]);

  const clearAllFiles = useCallback(() => {
    setUploadedFiles([]);
    onFileUpload([]);
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
      className="w-full space-y-4"
    >
      {/* Upload Zone */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer glass ${
          isDragging
            ? "border-primary glow-primary-strong scale-[1.01]"
            : "border-border hover:border-primary/50 border-glow-hover"
        }`}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.html,.htm"
          multiple
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
              isDragging ? "gradient-primary glow-primary-strong" : "bg-muted"
            }`}
          >
            <Upload
              className={`w-8 h-8 transition-colors ${
                isDragging ? "text-primary-foreground" : "text-muted-foreground"
              }`}
            />
          </motion.div>
          <p className="text-lg font-semibold text-foreground mb-2">
            {uploadedFiles.length > 0 ? 'Add more files' : 'Drop your documents here'}
          </p>
          <p className="text-muted-foreground mb-4">
            or click to browse from your computer
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {['PDF', 'DOC', 'DOCX', 'TXT', 'XLS', 'XLSX', 'HTML'].map((format) => (
              <span key={format} className="px-2 py-1 bg-muted rounded text-muted-foreground font-medium">
                {format}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Uploaded Files List */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                Uploaded Files ({uploadedFiles.length})
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFiles}
                className="text-muted-foreground hover:text-destructive"
              >
                Clear All
              </Button>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {uploadedFiles.map((file, index) => (
                <motion.div
                  key={`${file.name}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-3 border border-border rounded-lg glass"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground truncate max-w-[200px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="w-8 h-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FileUpload;
