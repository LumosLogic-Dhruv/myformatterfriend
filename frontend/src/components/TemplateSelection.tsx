import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, FileText, Briefcase, TrendingUp, Users, Receipt, Loader2 } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface TemplateSelectionProps {
  selectedTemplate: string | null;
  onSelectTemplate: (id: string | null) => void;
}

const categoryIcons: { [key: string]: React.ReactNode } = {
  Business: <Briefcase className="w-5 h-5" />,
  Marketing: <TrendingUp className="w-5 h-5" />,
  Career: <FileText className="w-5 h-5" />,
  Finance: <Receipt className="w-5 h-5" />,
};

const categoryGradients: { [key: string]: string } = {
  Business: "from-blue-600 to-indigo-800",
  Marketing: "from-purple-600 to-pink-700",
  Career: "from-emerald-600 to-teal-800",
  Finance: "from-amber-500 to-orange-700",
};

const TemplateSelection = ({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectionProps) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('https://myformatterfriend.onrender.com/api/document/templates');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.templates) {
            setTemplates(data.templates);
          }
        }
      } catch (err) {
        console.error('Failed to fetch templates:', err);
        setError('Failed to load templates');
        // Use fallback templates
        setTemplates([
          { id: "professional-report", name: "Professional Report", description: "Clean, formal report layout", category: "Business" },
          { id: "seo-report", name: "SEO Analysis Report", description: "Comprehensive SEO audit template", category: "Marketing" },
          { id: "resume", name: "Professional Resume", description: "Modern resume layout", category: "Career" },
          { id: "meeting-notes", name: "Meeting Notes", description: "Organized meeting minutes", category: "Business" },
          { id: "invoice", name: "Invoice", description: "Professional invoice template", category: "Finance" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const categories = ["All", ...Array.from(new Set(templates.map(t => t.category)))];

  const filteredTemplates = activeCategory === "All"
    ? templates
    : templates.filter((t) => t.category === activeCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading templates...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Pre-built Templates
        </h3>
        {selectedTemplate && (
          <button
            onClick={() => onSelectTemplate(null)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear selection
          </button>
        )}
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * index }}
            onClick={() => onSelectTemplate(template.id)}
            className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
              selectedTemplate === template.id
                ? "ring-2 ring-primary scale-[1.02] shadow-lg"
                : "hover:scale-[1.02] hover:shadow-md border border-border"
            }`}
          >
            {/* Template Preview */}
            <div className={`aspect-[4/3] bg-gradient-to-br ${categoryGradients[template.category] || 'from-gray-600 to-gray-800'} p-3 relative`}>
              {/* Icon */}
              <div className="absolute top-3 left-3 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white backdrop-blur-sm">
                {categoryIcons[template.category] || <FileText className="w-5 h-5" />}
              </div>

              {/* A4 Document Mockup */}
              <div className="absolute bottom-2 right-2 left-2 top-14 bg-white/95 rounded-lg shadow-lg p-2 flex flex-col gap-1">
                <div className="h-1.5 w-2/3 bg-gray-300 rounded-full" />
                <div className="h-1 w-1/2 bg-gray-200 rounded-full" />
                <div className="mt-2 space-y-1">
                  <div className="h-0.5 w-full bg-gray-200 rounded-full" />
                  <div className="h-0.5 w-full bg-gray-200 rounded-full" />
                  <div className="h-0.5 w-3/4 bg-gray-200 rounded-full" />
                </div>
              </div>

              {/* Selection Checkmark */}
              {selectedTemplate === template.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-3 bg-card">
              <p className="font-semibold text-foreground text-sm truncate">
                {template.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {template.description}
              </p>
              <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-md bg-muted text-muted-foreground">
                {template.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No templates found in this category
        </div>
      )}
    </motion.div>
  );
};

export default TemplateSelection;
