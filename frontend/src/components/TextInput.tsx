import { motion } from "framer-motion";
import { FileText, Type } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TextInputProps {
  directText: string;
  onTextChange: (text: string) => void;
}

const TextInput = ({ directText, onTextChange }: TextInputProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="glass border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5 text-primary" />
            Direct Text Input
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <FileText className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-green-800 dark:text-green-200">
              <p className="font-medium mb-1">Paste your content directly!</p>
              <p className="text-xs">
                No file upload needed - just paste your text, data, or content here.
              </p>
            </div>
          </div>
          
          <Textarea
            placeholder="Paste your text content here (reports, data, analysis, etc.)..."
            value={directText}
            onChange={(e) => onTextChange(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TextInput;