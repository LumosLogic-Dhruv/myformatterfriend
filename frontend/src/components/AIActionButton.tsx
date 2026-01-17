import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, FileSearch, FileOutput, Palette, Check, Upload, Brain, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIActionButtonProps {
  isDisabled: boolean;
  onGenerate: () => void;
  processingState: "idle" | "analyzing" | "extracting" | "applying" | "complete";
}

const processingSteps = [
  { key: "analyzing", icon: Brain, text: "Analyzing Document", subtext: "Understanding structure and content" },
  { key: "extracting", icon: FileSearch, text: "Extracting Key Details", subtext: "Identifying important information" },
  { key: "applying", icon: Wand2, text: "Applying Template", subtext: "Formatting your document" },
  { key: "complete", icon: Check, text: "Document Ready!", subtext: "Your document has been generated" },
];

const AIActionButton = ({
  isDisabled,
  onGenerate,
  processingState,
}: AIActionButtonProps) => {
  const isProcessing = processingState !== "idle" && processingState !== "complete";
  const currentStepIndex = processingSteps.findIndex((step) => step.key === processingState);
  const currentStep = processingSteps.find((step) => step.key === processingState);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full flex flex-col items-center gap-8"
    >
      <Button
        variant="gradient"
        size="xl"
        disabled={isDisabled || isProcessing}
        onClick={onGenerate}
        className="w-full md:w-auto min-w-[320px]"
      >
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              <span>Processing...</span>
            </motion.div>
          ) : processingState === "complete" ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <Check className="w-5 h-5" />
              <span>Generated Successfully!</span>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <Sparkles className="w-5 h-5" />
              <span>Generate Document</span>
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      {/* Processing Steps - Animated Progress */}
      <AnimatePresence>
        {(isProcessing || processingState === "complete") && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="w-full max-w-xl glass rounded-2xl p-6 border border-border"
          >
            <div className="space-y-4">
              {processingSteps.map((step, index) => {
                const isActive = step.key === processingState;
                const isComplete = currentStepIndex > index || processingState === "complete";
                const isPending = currentStepIndex < index && processingState !== "complete";

                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-4 transition-all duration-300 ${
                      isPending ? "opacity-40" : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isComplete
                          ? "gradient-primary glow-primary"
                          : isActive
                          ? "bg-primary/20 border border-primary animate-pulse-glow"
                          : "bg-muted"
                      }`}
                    >
                      {isComplete ? (
                        <Check className="w-5 h-5 text-primary-foreground" />
                      ) : (
                        <step.icon
                          className={`w-5 h-5 ${
                            isActive ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium transition-colors ${
                          isActive || isComplete ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.text}
                      </p>
                      <p className="text-sm text-muted-foreground">{step.subtext}</p>
                    </div>
                    {isActive && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-primary"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="mt-6 h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width:
                    processingState === "complete"
                      ? "100%"
                      : `${((currentStepIndex + 1) / processingSteps.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
                className="h-full gradient-primary rounded-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AIActionButton;
