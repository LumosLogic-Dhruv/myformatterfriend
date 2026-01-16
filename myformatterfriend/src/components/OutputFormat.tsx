import { motion } from "framer-motion";
import { Sparkles, Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OutputFormatProps {
  outputFormat: string;
  onFormatChange: (format: string) => void;
}

const OutputFormat = ({ outputFormat, onFormatChange }: OutputFormatProps) => {
  const suggestions = [
    "SEO Report",
    "Project Report", 
    "Business Analysis",
    "Technical Documentation",
    "Research Summary",
    "Performance Review"
  ];

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
            <Sparkles className="w-5 h-5 text-primary" />
            Output Format Description
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-2 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <Info className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-purple-800 dark:text-purple-200">
              <p className="font-medium mb-1">Describe your desired output in detail</p>
              <p className="text-xs">
                Tell us what kind of document you want, what sections to include, styling preferences, and any specific requirements.
              </p>
            </div>
          </div>
          
          <Textarea
            placeholder="Example: Create a professional SEO report with sections for performance metrics, keyword analysis, technical issues, and recommendations. Use modern styling with charts and color-coded priority levels. Include executive summary at the top."
            value={outputFormat}
            onChange={(e) => onFormatChange(e.target.value)}
            className="min-h-[120px] text-sm"
          />
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => onFormatChange(suggestion)}
                  className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OutputFormat;