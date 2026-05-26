import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import clinic1 from '@/assets/images/clinic-1.png';
import clinic2 from '@/assets/images/clinic-2.png';

export function AboutSection() {
  const { t } = useTranslation();
  const headerRef = useScrollAnimation();

  const timeline = [
    { year: '2010', event: 'Founded' },
    { year: '2013', event: 'First Award' },
    { year: '2016', event: 'New Facility' },
    { year: '2019', event: '100 Specialists' },
    { year: '2023', event: '5000 Patients' },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-card/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div ref={headerRef}>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              {t('about.heading')}
            </h2>
            <div className="w-20 h-1.5 bg-primary rounded-full mb-8"></div>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t('about.story')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="glass p-6 rounded-2xl">
                <Target className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-foreground mb-2">{t('about.mission')}</h3>
                <p className="text-sm text-muted-foreground">{t('about.missionDesc')}</p>
              </div>
              <div className="glass p-6 rounded-2xl">
                <Eye className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-foreground mb-2">{t('about.vision')}</h3>
                <p className="text-sm text-muted-foreground">{t('about.visionDesc')}</p>
              </div>
            </div>

            <div className="relative border-s-2 border-border ps-8 py-2">
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-6 last:mb-0 relative"
                >
                  <div className="absolute w-4 h-4 bg-background border-2 border-primary rounded-full -left-[41px] top-1"></div>
                  <h4 className="text-primary font-bold">{item.year}</h4>
                  <p className="text-foreground font-medium">{item.event}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl mb-8"
            >
              <img src={clinic1} alt="Clinic Interior" className="w-full object-cover aspect-[4/3] md:aspect-video hover:scale-105 transition-transform duration-700" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute -bottom-10 -end-10 z-20 w-2/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-background hidden md:block"
            >
              <img src={clinic2} alt="Treatment Room" className="w-full object-cover aspect-video hover:scale-105 transition-transform duration-700" />
            </motion.div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
