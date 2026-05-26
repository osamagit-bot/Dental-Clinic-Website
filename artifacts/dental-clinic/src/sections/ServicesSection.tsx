import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles, ActivitySquare, Smile, Shield, Gem, Heart } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function ServicesSection() {
  const { t } = useTranslation();
  const headingRef = useScrollAnimation({ y: 30 });
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      id: 'whitening',
      icon: Sparkles,
      title: t('services.whitening'),
      desc: t('services.whiteningDesc')
    },
    {
      id: 'implants',
      icon: ActivitySquare,
      title: t('services.implants'),
      desc: t('services.implantsDesc')
    },
    {
      id: 'ortho',
      icon: Smile,
      title: t('services.ortho'),
      desc: t('services.orthoDesc')
    },
    {
      id: 'root',
      icon: Shield,
      title: t('services.root'),
      desc: t('services.rootDesc')
    },
    {
      id: 'cosmetic',
      icon: Gem,
      title: t('services.cosmetic'),
      desc: t('services.cosmeticDesc')
    },
    {
      id: 'pediatric',
      icon: Heart,
      title: t('services.pediatric'),
      desc: t('services.pediatricDesc')
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 relative bg-card/50">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={headingRef} className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            {t('services.heading')}
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" ref={containerRef}>
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-3xl group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500"></div>
                
                <div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center mb-6 border border-border shadow-sm group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all">
                  <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {service.desc}
                </p>
                
                <div className="mt-6 flex items-center text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Explore <span className="ms-2">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
