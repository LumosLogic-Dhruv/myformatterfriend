import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-6 px-6 md:px-8 glass-strong border-b border-border sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img 
            src="/finalLogo.png" 
            alt="MyFormatterFriend Logo" 
            className="w-14 h-14 object-contain"
          />
          <span className="logo-text text-xl font-extrabold text-foreground text-center">        
            MyFormatter<span className="text-primary">Friend</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-sm transition-colors cursor-pointer ${
              isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/features" 
            className={`text-sm transition-colors cursor-pointer ${
              isActive('/features') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            Features
          </Link>
          <Link 
            to="/about" 
            className={`text-sm transition-colors cursor-pointer ${
              isActive('/about') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            About
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
