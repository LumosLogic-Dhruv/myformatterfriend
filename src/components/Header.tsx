import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-4 px-6 md:px-8"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">
            AI Document Formatter
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            Templates
          </span>
          <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            Features
          </span>
          <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            Help
          </span>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
