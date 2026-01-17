import { motion } from "framer-motion";
import { Bot, Sparkles, FileText, Zap } from "lucide-react";

interface LoadingAnimationProps {
  isVisible: boolean;
  currentModel?: string;
  processingStage?: string;
}

const LoadingAnimation = ({ 
  isVisible, 
  currentModel = "gemini-2.5-flash",
  processingStage = "Processing..."
}: LoadingAnimationProps) => {
  if (!isVisible) return null;

  const stages = [
    { icon: FileText, text: "Extracting content...", delay: 0 },
    { icon: Bot, text: "AI analyzing document...", delay: 0.5 },
    { icon: Sparkles, text: "Formatting with AI...", delay: 1 },
    { icon: Zap, text: "Generating output...", delay: 1.5 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass rounded-2xl border border-border p-8 max-w-md w-full mx-4"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity }
            }}
            className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 glow-primary"
          >
            <Bot className="w-8 h-8 text-primary-foreground" />
          </motion.div>
          
          <h3 className="text-xl font-semibold text-foreground mb-2">
            AI Processing Document
          </h3>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Using:</span>
            <span className="px-2 py-1 bg-primary/10 text-primary rounded font-medium">
              {currentModel}
            </span>
          </div>
        </div>

        {/* Processing Stages */}
        <div className="space-y-4 mb-6">
          {stages.map((stage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: stage.delay }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: stage.delay
                }}
                className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
              >
                <stage.icon className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-foreground">{stage.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
          />
        </div>

        {/* Status Text */}
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-center text-sm text-muted-foreground"
        >
          {processingStage}
        </motion.p>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0,
                x: Math.random() * 300,
                y: Math.random() * 200
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -50, -100],
                x: [0, Math.random() * 50 - 25]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut"
              }}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingAnimation;