import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Template {
  id: string;
  name: string;
  style: string;
  category: string;
  gradient: string;
}

interface TemplateSelectionProps {
  selectedTemplate: string | null;
  onSelectTemplate: (id: string) => void;
}

const templates: Template[] = [
  { id: "professional", name: "Professional Report", style: "Formal", category: "Report", gradient: "from-slate-700 to-slate-900" },
  { id: "business", name: "Business Proposal", style: "Modern", category: "Proposal", gradient: "from-secondary to-secondary/50" },
  { id: "minimal", name: "Minimal Resume", style: "Minimal", category: "Resume", gradient: "from-zinc-600 to-zinc-800" },
  { id: "creative", name: "Creative Brief", style: "Modern", category: "Profile", gradient: "from-violet-600 to-purple-800" },
  { id: "executive", name: "Executive Summary", style: "Formal", category: "Report", gradient: "from-emerald-700 to-teal-900" },
  { id: "academic", name: "Academic Paper", style: "Formal", category: "Report", gradient: "from-amber-600 to-orange-800" },
];

const categories = ["All", "Resume", "Proposal", "Report", "Profile"];

const TemplateSelection = ({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectionProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemplates = activeCategory === "All"
    ? templates
    : templates.filter((t) => t.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Select Template
        </h2>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeCategory === category
                ? "gradient-primary text-primary-foreground glow-primary"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * index }}
            onClick={() => onSelectTemplate(template.id)}
            className={`relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
              selectedTemplate === template.id
                ? "ring-2 ring-primary glow-primary-strong scale-[1.02]"
                : "hover:scale-[1.03] border-glow-hover"
            }`}
          >
            {/* Document Preview */}
            <div className={`aspect-[3/4] bg-gradient-to-br ${template.gradient} p-4 relative`}>
              {/* A4 Document Mockup */}
              <div className="absolute inset-3 bg-card/95 rounded-lg shadow-elevated p-3 flex flex-col gap-2 backdrop-blur-sm">
                {/* Header lines */}
                <div className="h-2 w-2/3 bg-primary/40 rounded-full" />
                <div className="h-1.5 w-1/2 bg-muted rounded-full" />
                
                {/* Content lines */}
                <div className="mt-3 space-y-1.5">
                  <div className="h-1 w-full bg-muted/60 rounded-full" />
                  <div className="h-1 w-full bg-muted/60 rounded-full" />
                  <div className="h-1 w-3/4 bg-muted/60 rounded-full" />
                </div>

                <div className="mt-2 space-y-1.5">
                  <div className="h-1 w-full bg-muted/40 rounded-full" />
                  <div className="h-1 w-5/6 bg-muted/40 rounded-full" />
                </div>

                {/* Block element */}
                <div className="mt-3 h-8 w-full bg-muted/30 rounded" />

                <div className="mt-2 space-y-1.5">
                  <div className="h-1 w-full bg-muted/40 rounded-full" />
                  <div className="h-1 w-2/3 bg-muted/40 rounded-full" />
                </div>
              </div>

              {/* Selection Checkmark */}
              {selectedTemplate === template.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full gradient-primary flex items-center justify-center glow-primary"
                >
                  <Check className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-4 bg-card border-t border-border">
              <p className="font-semibold text-foreground text-sm truncate">
                {template.name}
              </p>
              <span
                className={`inline-block mt-2 px-2.5 py-1 text-xs font-medium rounded-lg ${
                  template.style === "Formal"
                    ? "bg-muted text-muted-foreground"
                    : template.style === "Modern"
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-secondary-foreground"
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
