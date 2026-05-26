import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ThreeCanvas } from '@/components/ThreeCanvas';

export function HeroSection() {
  const { t } = useTranslation();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (!headlineRef.current) return;
    
    // Simple word split animation
    const text = headlineRef.current.innerText;
    headlineRef.current.innerHTML = '';
    
    const words = text.split(' ');
    words.forEach((word) => {
      const span = document.createElement('span');
      span.innerText = word + ' ';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.display = 'inline-block';
      headlineRef.current?.appendChild(span);
    });
    
    gsap.to(headlineRef.current.children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      delay: 2.8 // wait for loading screen
    });
  }, [t]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.6, duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6"
          >
            Premium Dental Care
          </motion.div>
          
          <h1 
            ref={headlineRef}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]"
          >
            {t('hero.title')}
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.4, duration: 0.8 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a 
              href="#appointment"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] active:scale-95"
            >
              {t('hero.bookBtn')}
            </a>
            <a 
              href="#about"
              className="px-8 py-4 rounded-full font-bold border border-border hover:bg-foreground/5 transition-all active:scale-95 text-foreground"
            >
              {t('hero.watchBtn')}
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8, duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border/50"
          >
            <div>
              <p className="text-3xl font-black text-foreground">5K+</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">{t('hero.stats.patients')}</p>
            </div>
            <div>
              <p className="text-3xl font-black text-foreground">15+</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">{t('hero.stats.experience')}</p>
            </div>
            <div>
              <p className="text-3xl font-black text-foreground">20+</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">{t('hero.stats.specialists')}</p>
            </div>
            <div>
              <p className="text-3xl font-black text-foreground">50+</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">{t('hero.stats.awards')}</p>
            </div>
          </motion.div>
        </div>

        <div className="hidden lg:block h-[600px] relative">
          <div className="absolute inset-0">
            <ThreeCanvas />
          </div>
        </div>
      </div>

      <motion.a 
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground hover:text-primary transition-colors cursor-pointer"
      >
        <span className="text-xs uppercase tracking-widest mb-2 font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}
