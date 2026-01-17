import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code, Sparkles, Heart, GraduationCap, MapPin } from "lucide-react";
import Header from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-32 h-32 rounded-full gradient-primary flex items-center justify-center mx-auto mb-8 glow-primary">
            <Code className="w-16 h-16 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Dhruv Shere
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-lg text-muted-foreground">Ahmedabad, India</span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Full-Stack MERN Developer & Information Technology Student
          </p>
        </motion.div>

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl border border-border p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">About Me</h2>
          </div>
          
          <div className="space-y-6 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              I'm Dhruv Shere, an Ahmedabad-based Full-Stack MERN Developer and Information Technology student. 
              Currently pursuing my Bachelor of Technology (B.Tech) at U.V. Patel College of Engineering, 
              Ganpat University (Class of 2026).
            </p>
            
            <p className="leading-relaxed">
              I'm recognized for my leadership in technical competitions like the Smart India Hackathon and 
              my expertise in building scalable web applications using React, Node.js, and MongoDB. 
              My passion lies in creating innovative solutions that solve real-world problems.
            </p>
            
            <p className="leading-relaxed">
              MyFormatterFriend showcases my expertise in AI integration and modern web development. 
              Built with React, Node.js, and Google Gemini AI, it features multiple file processing, 
              9 AI model fallbacks, real-time preview, and intelligent document formatting - 
              demonstrating my ability to create production-ready applications that solve real problems.
            </p>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-2xl border border-border p-8 mb-12"
        >
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Education
          </h3>
          <div className="space-y-4">
            <div className="border-l-2 border-primary pl-4">
              <h4 className="font-semibold text-foreground">Bachelor of Technology (B.Tech) - Information Technology</h4>
              <p className="text-muted-foreground">U.V. Patel College of Engineering, Ganpat University</p>
              <p className="text-sm text-muted-foreground">Expected 2026</p>
            </div>
            <div className="border-l-2 border-secondary pl-4">
              <h4 className="font-semibold text-foreground">Diploma in Information Technology</h4>
              <p className="text-muted-foreground">Government Polytechnic Ahmedabad</p>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-2xl border border-border p-8 mb-12"
        >
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Technical Expertise
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">MERN Stack</h4>
              <div className="flex flex-wrap gap-2">
                {["MongoDB", "Express.js", "React", "Node.js", "REST APIs"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">AI & Backend</h4>
              <div className="flex flex-wrap gap-2">
                {["Google Gemini AI", "9 Model Fallbacks", "File Processing", "Real-time Status"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-lg text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Connect Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            Let's Connect
          </h3>
          <p className="text-muted-foreground mb-8">
            I'm always excited to connect with fellow developers and collaborate on innovative projects!
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com/in/dhruv-shere/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 glass rounded-xl border border-border hover:border-primary/50 transition-colors"
            >
              <Linkedin className="w-6 h-6 text-blue-500" />
              <span className="text-sm">LinkedIn</span>
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/DHRUV-SHERE/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 glass rounded-xl border border-border hover:border-primary/50 transition-colors"
            >
              <Github className="w-6 h-6" />
              <span className="text-sm">GitHub</span>
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:sheredhruv@gmail.com"
              className="flex flex-col items-center gap-2 p-4 glass rounded-xl border border-border hover:border-primary/50 transition-colors"
            >
              <Mail className="w-6 h-6 text-red-500" />
              <span className="text-sm">Email</span>
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://portfolio-dhruvshere.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 glass rounded-xl border border-border hover:border-primary/50 transition-colors"
            >
              <Code className="w-6 h-6 text-green-500" />
              <span className="text-sm">Portfolio</span>
            </motion.a>
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

export default About;