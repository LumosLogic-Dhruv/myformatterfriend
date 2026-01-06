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
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Transform Documents with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your document, choose a template, and let AI format it beautifully in seconds.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-10">
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
      <footer className="py-8 mt-16 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 AI Document Formatter. Powered by intelligent automation.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
