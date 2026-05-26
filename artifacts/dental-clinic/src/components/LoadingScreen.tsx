import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="w-24 h-24 rounded-3xl bg-primary/20 flex items-center justify-center mb-8 relative"
        >
          <Activity className="w-12 h-12 text-primary absolute z-10" />
          <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-xl animate-pulse"></div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-foreground"
        >
          Smile<span className="text-primary">Care</span>
        </motion.h1>

        <div className="w-48 h-1 bg-foreground/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-primary"
          />
        </div>
      </div>
    </motion.div>
  );
}
