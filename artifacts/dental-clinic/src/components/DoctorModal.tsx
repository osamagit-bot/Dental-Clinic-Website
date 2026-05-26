import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, GraduationCap, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DoctorModalProps {
  doctor: any;
  onClose: () => void;
}

export function DoctorModal({ doctor, onClose }: DoctorModalProps) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'fa' || i18n.language === 'ps';

  if (!doctor) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl glass rounded-3xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row h-full max-h-[80vh] overflow-y-auto">
            <div className="w-full md:w-2/5 aspect-square md:aspect-auto relative bg-muted">
              <img 
                src={doctor.image} 
                alt={doctor.name}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
              <div className="absolute bottom-4 left-4 right-4 md:hidden">
                <h3 className="text-2xl font-bold text-white">{doctor.name}</h3>
                <p className="text-primary font-medium">{doctor.specialty}</p>
              </div>
            </div>

            <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
              <div className="hidden md:block mb-6">
                <h3 className="text-3xl font-bold text-foreground mb-1">{doctor.name}</h3>
                <p className="text-primary text-lg font-medium">{doctor.specialty}</p>
              </div>

              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {doctor.bio || "Dedicated to providing exceptional dental care with a gentle touch and state-of-the-art techniques. Passionate about creating beautiful, healthy smiles."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass p-4 rounded-xl flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Experience</p>
                      <p className="font-semibold text-foreground">{doctor.experience}</p>
                    </div>
                  </div>
                  <div className="glass p-4 rounded-xl flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Awards</p>
                      <p className="font-semibold text-foreground">Top Rated {new Date().getFullYear()}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Education & Certifications
                  </h4>
                  <ul className="space-y-2 text-muted-foreground text-sm list-disc list-inside ms-1">
                    <li>Doctor of Dental Surgery (DDS)</li>
                    <li>Advanced Board Certification</li>
                    <li>Member of Dental Association</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
