import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, FileSearch, FileOutput, Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIActionButtonProps {
  isDisabled: boolean;
  onGenerate: () => void;
  processingState: "idle" | "analyzing" | "extracting" | "applying" | "complete";
}

const processingSteps = [
  { key: "analyzing", icon: FileSearch, text: "Analyzing document..." },
  { key: "extracting", icon: FileOutput, text: "Extracting information..." },
  { key: "applying", icon: Palette, text: "Applying selected template..." },
  { key: "complete", icon: Check, text: "Document generated!" },
];

const AIActionButton = ({
  isDisabled,
  onGenerate,
  processingState,
}: AIActionButtonProps) => {
  const isProcessing = processingState !== "idle" && processingState !== "complete";
  const currentStep = processingSteps.find((step) => step.key === processingState);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full flex flex-col items-center gap-4"
    >
      <Button
        variant="gradient"
        size="xl"
        disabled={isDisabled || isProcessing}
        onClick={onGenerate}
        className="w-full md:w-auto min-w-[280px]"
      >
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
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
              className="flex items-center gap-2"
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
              className="flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Generate Document with AI</span>
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      {/* Processing Steps */}
      <AnimatePresence>
        {isProcessing && currentStep && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="flex items-center gap-3 text-primary"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <currentStep.icon className="w-5 h-5" />
            </motion.div>
            <span className="text-sm font-medium">{currentStep.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AIActionButton;
