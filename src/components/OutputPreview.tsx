import { motion } from "framer-motion";
import { Download, ExternalLink, RefreshCw, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OutputPreviewProps {
  isVisible: boolean;
  templateName: string;
  onDownload: () => void;
  onEdit: () => void;
  onRegenerate: () => void;
}

const OutputPreview = ({
  isVisible,
  templateName,
  onDownload,
  onEdit,
  onRegenerate,
}: OutputPreviewProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Generated Document
        </h2>
        <span className="text-sm text-muted-foreground">
          Template: {templateName}
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-elevated overflow-hidden">
        {/* Document Preview */}
        <div className="relative bg-muted/30 p-8 min-h-[400px] md:min-h-[500px] flex items-center justify-center">
          {/* Mock A4 Document */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="w-full max-w-[300px] md:max-w-[400px] aspect-[1/1.414] bg-card rounded-lg shadow-elevated p-6 md:p-8"
          >
            {/* Document Header */}
            <div className="space-y-3 mb-6">
              <div className="h-4 w-3/4 bg-gradient-to-r from-primary to-accent rounded-full opacity-80" />
              <div className="h-2 w-1/2 bg-muted rounded-full" />
            </div>

            {/* Document Content */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-2 w-full bg-muted/80 rounded-full" />
                <div className="h-2 w-full bg-muted/80 rounded-full" />
                <div className="h-2 w-4/5 bg-muted/80 rounded-full" />
              </div>

              <div className="space-y-2">
                <div className="h-2 w-full bg-muted/60 rounded-full" />
                <div className="h-2 w-full bg-muted/60 rounded-full" />
                <div className="h-2 w-3/4 bg-muted/60 rounded-full" />
              </div>

              <div className="h-16 w-full bg-muted/40 rounded-lg" />

              <div className="space-y-2">
                <div className="h-2 w-full bg-muted/60 rounded-full" />
                <div className="h-2 w-5/6 bg-muted/60 rounded-full" />
              </div>
            </div>

            {/* AI Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-full gradient-primary text-primary-foreground text-xs font-medium flex items-center gap-1.5 shadow-lg"
            >
              <FileText className="w-3 h-3" />
              AI Generated
            </motion.div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-border bg-card/80 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Button variant="gradient" size="lg" onClick={onDownload} className="flex-1 sm:flex-none">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button variant="outline" size="lg" onClick={onEdit} className="flex-1 sm:flex-none">
              <ExternalLink className="w-4 h-4" />
              Edit in Canva
            </Button>
            <Button variant="secondary" size="lg" onClick={onRegenerate} className="flex-1 sm:flex-none">
              <RefreshCw className="w-4 h-4" />
              Regenerate
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OutputPreview;
