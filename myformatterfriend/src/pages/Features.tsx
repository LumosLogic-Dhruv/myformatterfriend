import { motion } from "framer-motion";
import { FileText, Sparkles, Download, Zap, Shield, Globe } from "lucide-react";
import Header from "@/components/Header";

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "Multiple File Support",
      description: "Upload multiple files simultaneously - PDF, DOCX, DOC, TXT, XLSX, XLS. Process everything at once with intelligent content merging.",
    },
    {
      icon: Sparkles,
      title: "9 AI Models Fallback",
      description: "Powered by Google Gemini with 9 model fallbacks including gemini-2.5-flash-lite, gemini-3-flash, and gemma series for maximum reliability.",
    },
    {
      icon: Download,
      title: "Flexible Templates",
      description: "Upload template files of any format, provide HTML code, or simply describe your desired output format. Complete customization freedom.",
    },
    {
      icon: Zap,
      title: "Real-time Preview & Editor",
      description: "Live preview with built-in HTML editor, fullscreen mode, and instant editing capabilities. See changes as you make them.",
    },
    {
      icon: Shield,
      title: "Secure & Fast Processing",
      description: "Temporary file handling with auto-cleanup, real-time status monitoring, and backend connection indicators for transparency.",
    },
    {
      icon: Globe,
      title: "Professional Web-Ready Output",
      description: "Generate clean, professional HTML documents optimized for web publishing, with proper formatting and styling preservation.",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Upload Multiple Files",
      description: "Upload multiple documents or paste text directly. Support for PDF, DOCX, TXT, Excel files with intelligent content merging.",
    },
    {
      step: "2",
      title: "Choose Format Method",
      description: "Upload template files, provide HTML code, or describe your desired format. Three flexible ways to specify output.",
    },
    {
      step: "3",
      title: "AI Processing",
      description: "9 Gemini AI models process your content with real-time status updates and automatic fallback for maximum reliability.",
    },
    {
      step: "4",
      title: "Preview & Edit",
      description: "Real-time preview with built-in HTML editor, fullscreen mode, and instant download. Edit and perfect before saving.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Powerful Features for
            <span className="text-primary text-glow"> Document Processing</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how MyFormatterFriend transforms your documents with AI-powered processing and flexible formatting options.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="glass rounded-2xl border border-border p-6 hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 glow-primary">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 glow-primary">
                  <span className="text-2xl font-bold text-primary-foreground">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Supported Formats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass rounded-2xl border border-border p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Supported File Formats</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["PDF", "DOCX", "DOC", "TXT", "XLSX", "XLS"].map((format) => (
              <span
                key={format}
                className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
              >
                {format}
              </span>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border glass">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 AI MyFormatterFriend. Powered by Dhruv's Web Projects.</p>
        </div>
      </footer>
    </div>
  );
};

export default Features;