import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { DoctorModal } from '@/components/DoctorModal';

import doc1 from '@/assets/images/doctor-1.png';
import doc2 from '@/assets/images/doctor-2.png';
import doc3 from '@/assets/images/doctor-3.png';
import doc4 from '@/assets/images/doctor-4.png';

export function DoctorsSection() {
  const { t, i18n } = useTranslation();
  const headingRef = useScrollAnimation({ y: 30 });
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  
  const isRTL = i18n.language === 'fa' || i18n.language === 'ps';

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      specialty: 'Lead Cosmetic Dentist',
      experience: '12+ Years',
      image: doc1,
    },
    {
      id: 2,
      name: 'Dr. James Chen',
      specialty: 'Orthodontist',
      experience: '8+ Years',
      image: doc2,
    },
    {
      id: 3,
      name: 'Dr. Layla Hassan',
      specialty: 'Implant Specialist',
      experience: '10+ Years',
      image: doc3,
    },
    {
      id: 4,
      name: 'Dr. Michael Torres',
      specialty: 'Pediatric Dentist',
      experience: '7+ Years',
      image: doc4,
    }
  ];

  return (
    <section id="doctors" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              {t('doctors.heading')}
            </h2>
            <div className="w-20 h-1.5 bg-primary rounded-full"></div>
          </div>
          <button className="flex items-center gap-2 font-semibold text-primary hover:underline hover:underline-offset-4 w-fit">
            View All Team <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedDoctor(doctor)}
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6 bg-muted">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="w-full flex justify-between items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="font-semibold text-white">{t('doctors.viewProfile')}</span>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-primary transition-colors">
                        <Linkedin className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Glow border on hover */}
                <div className="absolute inset-0 border-2 border-primary/0 rounded-3xl group-hover:border-primary/50 transition-colors duration-300 pointer-events-none"></div>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{doctor.name}</h3>
              <p className="text-muted-foreground text-sm font-medium">{doctor.specialty}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <DoctorModal 
        doctor={selectedDoctor} 
        onClose={() => setSelectedDoctor(null)} 
      />
    </section>
  );
}
