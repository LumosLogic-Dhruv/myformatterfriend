import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import TemplateSelection from "@/components/TemplateSelection";
import AIActionButton from "@/components/AIActionButton";
import OutputPreview from "@/components/OutputPreview";
import { useToast } from "@/hooks/use-toast";

type ProcessingState = "idle" | "analyzing" | "extracting" | "applying" | "complete";

const templateNames: Record<string, string> = {
  professional: "Professional Report",
  business: "Business Proposal",
  minimal: "Minimal Resume",
  creative: "Creative Brief",
  executive: "Executive Summary",
  academic: "Academic Paper",
};

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>("idle");
  const [showOutput, setShowOutput] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = useCallback((file: File | null) => {
    setUploadedFile(file);
    setShowOutput(false);
    setProcessingState("idle");
  }, []);

  const handleSelectTemplate = useCallback((id: string) => {
    setSelectedTemplate(id);
    setShowOutput(false);
    setProcessingState("idle");
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!uploadedFile || !selectedTemplate) return;

    const states: ProcessingState[] = ["analyzing", "extracting", "applying", "complete"];
    
    for (const state of states) {
      setProcessingState(state);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    setShowOutput(true);
    toast({
      title: "Document Generated!",
      description: "Your AI-formatted document is ready to download.",
    });
  }, [uploadedFile, selectedTemplate, toast]);

  const handleDownload = useCallback(() => {
    toast({
      title: "Download Started",
      description: "Your document is being prepared for download.",
    });
  }, [toast]);

  const handleEdit = useCallback(() => {
    toast({
      title: "Opening Canva",
      description: "Redirecting you to edit in Canva...",
    });
  }, [toast]);

  const handleRegenerate = useCallback(() => {
    setShowOutput(false);
    setProcessingState("idle");
    handleGenerate();
  }, [handleGenerate]);

  const isActionDisabled = !uploadedFile || !selectedTemplate;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] gradient-dark opacity-60 blur-3xl" />
          <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute top-60 right-1/4 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Upload Your Document.
              <br />
              <span className="text-primary text-glow">We Handle the Rest.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              AI-powered document analysis & auto-formatting. Transform any document 
              into a professionally styled template in seconds.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-16">
          {/* Upload Section */}
          <FileUpload onFileUpload={handleFileUpload} />

          {/* Template Selection */}
          <TemplateSelection
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleSelectTemplate}
          />

          {/* AI Action */}
          <AIActionButton
            isDisabled={isActionDisabled}
            onGenerate={handleGenerate}
            processingState={processingState}
          />

          {/* Output Preview */}
          <OutputPreview
            isVisible={showOutput}
            templateName={selectedTemplate ? templateNames[selectedTemplate] : ""}
            onDownload={handleDownload}
            onEdit={handleEdit}
            onRegenerate={handleRegenerate}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border glass">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 AI Document Formatter. Powered by intelligent automation.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
