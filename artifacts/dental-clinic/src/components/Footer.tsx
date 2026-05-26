import { useTranslation } from 'react-i18next';
import { Activity, Instagram, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-card py-12 md:py-16 border-t border-border mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight">SmileCare</span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.home')}</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.services')}</a></li>
              <li><a href="#doctors" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.doctors')}</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.about')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.contactInfo')}</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>123 Future Ave, Innovation District</li>
              <li>hello@smilecare.clinic</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-start">
            {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
