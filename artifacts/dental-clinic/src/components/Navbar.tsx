import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, Moon, Sun, Activity } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangDropdownOpen(false);
  };

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#services', label: t('nav.services') },
    { href: '#doctors', label: t('nav.doctors') },
    { href: '#about', label: t('nav.about') },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight">SmileCare</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-foreground/5 transition-colors text-foreground/80 hover:text-primary"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="relative">
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 p-2 rounded-full hover:bg-foreground/5 transition-colors text-foreground/80 hover:text-primary"
              >
                <Globe className="w-5 h-5" />
                <span className="text-xs font-medium uppercase">{i18n.language}</span>
              </button>
              
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full end-0 mt-2 w-32 glass rounded-xl overflow-hidden py-1 border border-border shadow-lg"
                  >
                    <button onClick={() => changeLanguage('en')} className="w-full text-start px-4 py-2 text-sm hover:bg-foreground/5">English</button>
                    <button onClick={() => changeLanguage('fa')} className="w-full text-start px-4 py-2 text-sm hover:bg-foreground/5">فارسی</button>
                    <button onClick={() => changeLanguage('ps')} className="w-full text-start px-4 py-2 text-sm hover:bg-foreground/5">پښتو</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a 
              href="#appointment"
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.4)]"
            >
              {t('nav.contact')}
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass overflow-hidden border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium py-2 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="font-medium">Theme</span>
                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full bg-foreground/5">
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex gap-2 py-2">
                <button onClick={() => changeLanguage('en')} className={`flex-1 py-2 rounded-lg text-sm ${i18n.language === 'en' ? 'bg-primary text-primary-foreground' : 'bg-foreground/5'}`}>EN</button>
                <button onClick={() => changeLanguage('fa')} className={`flex-1 py-2 rounded-lg text-sm ${i18n.language === 'fa' ? 'bg-primary text-primary-foreground' : 'bg-foreground/5'}`}>FA</button>
                <button onClick={() => changeLanguage('ps')} className={`flex-1 py-2 rounded-lg text-sm ${i18n.language === 'ps' ? 'bg-primary text-primary-foreground' : 'bg-foreground/5'}`}>PS</button>
              </div>
              <a 
                href="#appointment"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-primary text-primary-foreground text-center py-3 rounded-xl font-medium mt-2"
              >
                {t('nav.contact')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
