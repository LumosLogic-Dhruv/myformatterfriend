import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Template {
  id: string;
  name: string;
  style: string;
  color: string;
}

interface TemplateSelectionProps {
  selectedTemplate: string | null;
  onSelectTemplate: (id: string) => void;
}

const templates: Template[] = [
  { id: "professional", name: "Professional Report", style: "Formal", color: "from-slate-600 to-slate-800" },
  { id: "business", name: "Business Proposal", style: "Modern", color: "from-blue-500 to-indigo-600" },
  { id: "minimal", name: "Minimal Resume", style: "Minimal", color: "from-gray-400 to-gray-600" },
  { id: "creative", name: "Creative Brief", style: "Modern", color: "from-purple-500 to-pink-500" },
  { id: "executive", name: "Executive Summary", style: "Formal", color: "from-emerald-600 to-teal-700" },
  { id: "academic", name: "Academic Paper", style: "Formal", color: "from-amber-500 to-orange-600" },
];

const TemplateSelection = ({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Select Template
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            onClick={() => onSelectTemplate(template.id)}
            className={`relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
              selectedTemplate === template.id
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-elevated"
                : "shadow-card hover:shadow-card-hover"
            }`}
          >
            {/* Document Preview */}
            <div className={`aspect-[3/4] bg-gradient-to-br ${template.color} p-4 relative`}>
              {/* A4 Document Mockup */}
              <div className="absolute inset-3 bg-card rounded-lg shadow-lg p-3 flex flex-col gap-2">
                {/* Header lines */}
                <div className="h-2 w-2/3 bg-muted rounded-full" />
                <div className="h-1.5 w-1/2 bg-muted/70 rounded-full" />
                
                {/* Content lines */}
                <div className="mt-3 space-y-1.5">
                  <div className="h-1 w-full bg-muted/50 rounded-full" />
                  <div className="h-1 w-full bg-muted/50 rounded-full" />
                  <div className="h-1 w-3/4 bg-muted/50 rounded-full" />
                </div>

                <div className="mt-2 space-y-1.5">
                  <div className="h-1 w-full bg-muted/50 rounded-full" />
                  <div className="h-1 w-5/6 bg-muted/50 rounded-full" />
                </div>

                {/* Block element */}
                <div className="mt-3 h-8 w-full bg-muted/30 rounded" />

                <div className="mt-2 space-y-1.5">
                  <div className="h-1 w-full bg-muted/50 rounded-full" />
                  <div className="h-1 w-2/3 bg-muted/50 rounded-full" />
                </div>
              </div>

              {/* Selection Checkmark */}
              {selectedTemplate === template.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-4 bg-card">
              <p className="font-medium text-foreground text-sm truncate">
                {template.name}
              </p>
              <span
                className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                  template.style === "Formal"
                    ? "bg-secondary text-secondary-foreground"
                    : template.style === "Modern"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {template.style}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TemplateSelection;
