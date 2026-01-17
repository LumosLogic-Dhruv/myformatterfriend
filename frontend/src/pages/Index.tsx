import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Upload, Type, FileCode } from "lucide-react";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import TextInput from "@/components/TextInput";
import HTMLTemplateInput from "@/components/HTMLTemplateInput";
import TemplateFileUpload from "@/components/TemplateFileUpload";
import OutputFormat from "@/components/OutputFormat";
import AIActionButton from "@/components/AIActionButton";
import RealtimePreview from "@/components/RealtimePreview";
import LoadingAnimation from "@/components/LoadingAnimation";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ProcessingState = "idle" | "analyzing" | "extracting" | "applying" | "complete";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Index = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [directText, setDirectText] = useState<string>("");
  const [htmlTemplate, setHtmlTemplate] = useState<string>("");
  const [outputFormat, setOutputFormat] = useState<string>("");
  const [processingState, setProcessingState] = useState<ProcessingState>("idle");
  const [showOutput, setShowOutput] = useState(false);
  const [processedData, setProcessedData] = useState<any>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [generatedHtml, setGeneratedHtml] = useState<string>("");
  const [currentModel, setCurrentModel] = useState<string>("");
  const [modelLimits, setModelLimits] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);
  const { toast } = useToast();

  // Fetch current model status and check backend connection
  useEffect(() => {
    const fetchModelStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/document/model-status`);
        const data = await response.json();
        if (data.success) {
          setCurrentModel(data.currentModel);
          setModelLimits(data.limits);
          setBackendConnected(true);
        }
      } catch (error) {
        console.error('Failed to fetch model status:', error);
        setBackendConnected(false);
        setCurrentModel('Waking up server...');
        setModelLimits(null);
      }
    };
    
    fetchModelStatus();
    // Poll every 30 seconds
    const interval = setInterval(fetchModelStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = useCallback((files: File[]) => {
    setUploadedFiles(files);
    setShowOutput(false);
    setProcessingState("idle");
    setProcessedData(null);
    setDownloadUrl(null);
  }, []);

  const handleTemplateFileUpload = useCallback((file: File | null) => {
    setTemplateFile(file);
    setShowOutput(false);
    setProcessingState("idle");
  }, []);

  const handleTemplateChange = useCallback((template: string) => {
    setHtmlTemplate(template);
    setShowOutput(false);
    setProcessingState("idle");
  }, []);

  const handleGenerate = useCallback(async () => {
    if ((!uploadedFiles.length && !directText.trim()) || 
        (!htmlTemplate.trim() && !outputFormat.trim() && !templateFile)) {
      toast({
        title: "Missing Input",
        description: "Please provide files/text and template/format.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setProcessingState("analyzing");
      
      // Create FormData for file upload
      const formData = new FormData();
      
      // Add multiple files
      uploadedFiles.forEach(file => {
        formData.append('files', file);
      });
      
      // Add template file if provided
      if (templateFile) {
        formData.append('templateFile', templateFile);
      }
      
      if (directText.trim()) {
        formData.append('directText', directText);
      }
      if (htmlTemplate.trim()) {
        formData.append('htmlTemplate', htmlTemplate);
      }
      if (outputFormat.trim()) {
        formData.append('outputFormat', outputFormat);
      }

      setProcessingState("extracting");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProcessingState("applying");
      
      // Send request to backend
      console.log('Sending request to:', `${API_BASE_URL}/document/process`);
      const response = await fetch(`${API_BASE_URL}/document/process`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Processing failed');
      }

      const result = await response.json();
      
      // Update current model
      if (result.modelUsed) {
        setCurrentModel(result.modelUsed);
      }
      
      // Create mock extracted data for display
      const mockExtractedData = {
        name: "Data extracted and processed",
        email: "Check generated HTML below", 
        phone: "All information processed",
        experience: "View complete document",
        skills: "Successfully formatted",
        summary: "AI has analyzed and formatted your content",
        filesProcessed: result.filesProcessed || uploadedFiles.length,
        templateSource: result.templateSource || 'provided'
      };
      
      setProcessedData(mockExtractedData);
      setDownloadUrl(result.downloadUrl);
      setGeneratedHtml(result.htmlContent);
      setProcessingState("complete");
      setShowOutput(true);
      setIsLoading(false);
      
      toast({
        title: "Document Generated!",
        description: `Processed ${result.filesProcessed || 1} file(s) using ${result.modelUsed || 'AI'}.`,
      });
    } catch (error) {
      console.error('Processing error:', error);
      setProcessingState("idle");
      setIsLoading(false);
      toast({
        title: "Processing Failed",
        description: error instanceof Error ? error.message : "An error occurred while processing your content.",
        variant: "destructive",
      });
    }
  }, [uploadedFiles, templateFile, directText, htmlTemplate, outputFormat, toast]);

  const handleDownload = useCallback(async () => {
    if (!downloadUrl) {
      toast({
        title: "Download Error",
        description: "No file available for download.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${downloadUrl}`);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `formatted_document_${Date.now()}.html`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Download Started",
        description: "Your document is being downloaded.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the document.",
        variant: "destructive",
      });
    }
  }, [downloadUrl, toast]);

  const handleEdit = useCallback(() => {
    // This will be handled by the RealtimePreview component
  }, []);

  const handleRegenerate = useCallback(() => {
    setShowOutput(false);
    setProcessingState("idle");
    setProcessedData(null);
    setDownloadUrl(null);
    handleGenerate();
  }, [handleGenerate]);

  const isActionDisabled = (!uploadedFiles.length && !directText.trim()) || 
                          (!htmlTemplate.trim() && !outputFormat.trim() && !templateFile);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Loading Animation */}
      <LoadingAnimation 
        isVisible={isLoading}
        currentModel={currentModel}
        processingStage={processingState === "analyzing" ? "Analyzing content..." : 
                        processingState === "extracting" ? "Extracting data..." :
                        processingState === "applying" ? "Applying AI formatting..." : "Processing..."}
      />
      
      {/* Service Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-b border-primary/20 py-3 px-4"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium text-foreground">
                {backendConnected ? 'Backend Connected' : 'Waking up server, please wait...'}
              </span>
            </div>
            <div className="h-4 w-px bg-border"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">AI Service:</span>
              <span className="px-2 py-1 bg-primary/20 text-primary rounded text-sm font-medium">
                {currentModel.includes('gemini') ? 'Google Gemini' : 
                 currentModel.includes('gpt') || currentModel.includes('o3') || currentModel.includes('o4') ? 'OpenAI' : 
                 'Text Processing'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Model:</span>
              <span className="px-2 py-1 bg-secondary/20 text-secondary-foreground rounded text-sm font-medium">
                {currentModel || 'Loading...'}
              </span>
            </div>
            {modelLimits && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Limits:</span>
                <span className="px-2 py-1 bg-muted rounded text-xs">
                  {modelLimits.rpm} RPM | {modelLimits.tpm} TPM | {modelLimits.rpd} RPD
                </span>
              </div>
            )}
          </div>
          {/* <div className="text-xs text-muted-foreground">
            Port: 5000 | Frontend: 8080
          </div> */}
        </div>
      </motion.div>
      
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
              Upload Multiple Documents.
              <br />
              <span className="text-primary text-glow">AI Formats Everything.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Upload multiple files, paste text, or use template files. Our AI processes everything with real-time preview.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-12">
          {/* Step 1: Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl border border-border p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </div>
              <h2 className="text-2xl font-bold text-foreground">Upload Your Content</h2>
            </div>
            <p className="text-muted-foreground mb-6">Upload multiple files AND/OR paste text directly. You can use both methods together.</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Files (Multiple Supported)
                </h3>
                <FileUpload onFileUpload={handleFileUpload} />
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">And/Or</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Paste Text Directly
                </h3>
                <TextInput directText={directText} onTextChange={setDirectText} />
              </div>
            </div>
          </motion.div>

          {/* Step 2: Output Format Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl border border-border p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <h2 className="text-2xl font-bold text-foreground">Choose Output Format</h2>
            </div>
            <p className="text-muted-foreground mb-6">Specify how you want your content formatted - provide HTML code, upload a template file, or just describe the format.</p>
            
            <Tabs defaultValue="template" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="template" className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  HTML Code
                </TabsTrigger>
                <TabsTrigger value="file" className="flex items-center gap-2">
                  <FileCode className="w-4 h-4" />
                  Template File
                </TabsTrigger>
                <TabsTrigger value="format" className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Describe Format
                </TabsTrigger>
              </TabsList>
              <TabsContent value="template" className="mt-6">
                <HTMLTemplateInput
                  htmlTemplate={htmlTemplate}
                  onTemplateChange={setHtmlTemplate}
                />
              </TabsContent>
              <TabsContent value="file" className="mt-6">
                <TemplateFileUpload onTemplateUpload={handleTemplateFileUpload} />
              </TabsContent>
              <TabsContent value="format" className="mt-6">
                <OutputFormat
                  outputFormat={outputFormat}
                  onFormatChange={setOutputFormat}
                />
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Step 3: Generate Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl border border-border p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <h2 className="text-2xl font-bold text-foreground">Generate Document</h2>
            </div>
            <p className="text-muted-foreground mb-6">Let AI process your content and create a professionally formatted document.</p>
            
            <AIActionButton
              isDisabled={isActionDisabled}
              onGenerate={handleGenerate}
              processingState={processingState}
            />
          </motion.div>

          {/* Step 4: Preview & Download Section */}
          {showOutput && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl border border-border p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  4
                </div>
                <h2 className="text-2xl font-bold text-foreground">Preview & Download</h2>
              </div>
              <p className="text-muted-foreground mb-6">Review your formatted document and download when ready.</p>
              
              <RealtimePreview
                htmlContent={generatedHtml}
                isVisible={showOutput}
                onEdit={handleEdit}
                onDownload={handleDownload}
                fileName={processedData?.fileName}
              />
            </motion.div>
          )}
        </div>
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

export default Index;
