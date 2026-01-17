import { motion } from "framer-motion";
import { Code, Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HTMLTemplateInputProps {
  htmlTemplate: string;
  onTemplateChange: (template: string) => void;
}

const HTMLTemplateInput = ({ htmlTemplate, onTemplateChange }: HTMLTemplateInputProps) => {
  const exampleTemplate = `<!DOCTYPE html>
<html>
<head>
    <title>Professional Resume</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .name { font-size: 2.5em; font-weight: bold; color: #333; }
        .contact { color: #666; margin: 10px 0; }
        .section { margin: 30px 0; }
        .section-title { font-size: 1.3em; font-weight: bold; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        .content { margin: 15px 0; line-height: 1.6; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="name">[Your Name Here]</div>
            <div class="contact">[Email] | [Phone] | [Location]</div>
        </div>
        
        <div class="section">
            <div class="section-title">Professional Summary</div>
            <div class="content">[Professional summary will be filled here]</div>
        </div>
        
        <div class="section">
            <div class="section-title">Work Experience</div>
            <div class="content">[Work experience details will be filled here]</div>
        </div>
        
        <div class="section">
            <div class="section-title">Skills & Competencies</div>
            <div class="content">[Skills and competencies will be filled here]</div>
        </div>
        
        <div class="section">
            <div class="section-title">Education</div>
            <div class="content">[Education details will be filled here]</div>
        </div>
    </div>
</body>
</html>`;

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
            <Code className="w-5 h-5 text-primary" />
            HTML Template
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-medium mb-1">AI will analyze your HTML template and fill it automatically!</p>
              <p className="text-xs">
                No need for placeholders - just paste any HTML template and AI will understand what data to fill.
              </p>
            </div>
          </div>
          
          <Textarea
            placeholder="Paste your HTML template here..."
            value={htmlTemplate}
            onChange={(e) => onTemplateChange(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
          
          {!htmlTemplate && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Need an example? Try this template:</p>
              <button
                onClick={() => onTemplateChange(exampleTemplate)}
                className="text-xs text-primary hover:underline"
              >
                Load Example Template
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HTMLTemplateInput;