import { motion } from "framer-motion";
import { Download, ExternalLink, RefreshCw, FileText, User, Briefcase, Calendar, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OutputPreviewProps {
  isVisible: boolean;
  templateName: string;
  onDownload: () => void;
  onEdit: () => void;
  onRegenerate: () => void;
}

const extractedData = [
  { icon: User, label: "Name", value: "John Anderson" },
  { icon: Mail, label: "Email", value: "john.anderson@email.com" },
  { icon: Briefcase, label: "Role", value: "Senior Product Designer" },
  { icon: MapPin, label: "Location", value: "San Francisco, CA" },
  { icon: Calendar, label: "Experience", value: "8+ Years" },
];

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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Generated Document
        </h2>
        <span className="text-sm text-muted-foreground px-3 py-1 bg-muted rounded-lg">
          Template: {templateName}
        </span>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* AI Extracted Data Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass rounded-2xl border border-border p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Extracted Data</h3>
          </div>

          <div className="space-y-4">
            {extractedData.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium text-foreground truncate">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <Button variant="outline" size="sm" className="w-full">
              Edit Content
            </Button>
          </div>
        </motion.div>

        {/* Document Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 glass rounded-2xl border border-border overflow-hidden"
        >
          {/* Preview Area */}
          <div className="relative bg-muted/20 p-8 min-h-[500px] flex items-center justify-center">
            {/* Mock A4 Document */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="w-full max-w-[320px] aspect-[1/1.414] bg-card rounded-xl shadow-elevated p-6 relative"
            >
              {/* Document Header */}
              <div className="space-y-3 mb-6">
                <div className="h-4 w-3/4 gradient-primary rounded-full" />
                <div className="h-2 w-1/2 bg-muted rounded-full" />
              </div>

              {/* Document Content */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="h-2 w-full bg-muted/70 rounded-full" />
                  <div className="h-2 w-full bg-muted/70 rounded-full" />
                  <div className="h-2 w-4/5 bg-muted/70 rounded-full" />
                </div>

                <div className="space-y-2">
                  <div className="h-2 w-full bg-muted/50 rounded-full" />
                  <div className="h-2 w-full bg-muted/50 rounded-full" />
                  <div className="h-2 w-3/4 bg-muted/50 rounded-full" />
                </div>

                <div className="h-20 w-full bg-muted/30 rounded-lg" />

                <div className="space-y-2">
                  <div className="h-2 w-full bg-muted/50 rounded-full" />
                  <div className="h-2 w-5/6 bg-muted/50 rounded-full" />
                </div>
              </div>

              {/* AI Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full gradient-primary text-primary-foreground text-xs font-semibold flex items-center gap-1.5 glow-primary"
              >
                <FileText className="w-3 h-3" />
                AI Generated
              </motion.div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="p-5 border-t border-border bg-card/50 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Button variant="gradient" size="lg" onClick={onDownload} className="flex-1 sm:flex-none">
                <Download className="w-4 h-4" />
                Export Document
              </Button>
              <Button variant="outline" size="lg" onClick={onEdit} className="flex-1 sm:flex-none border-border hover:border-primary/50">
                <ExternalLink className="w-4 h-4" />
                Edit in Canva
              </Button>
              <Button variant="secondary" size="lg" onClick={onRegenerate} className="flex-1 sm:flex-none">
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OutputPreview;
