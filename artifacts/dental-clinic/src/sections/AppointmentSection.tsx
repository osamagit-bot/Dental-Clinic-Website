import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Calendar, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone number is required'),
  service: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Please select a date'),
  message: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

export function AppointmentSection() {
  const { t } = useTranslation();
  const containerRef = useScrollAnimation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="appointment" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={containerRef}>
        <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-[2.5rem] border border-border/50 shadow-2xl relative overflow-hidden">
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>

          <div className="text-center mb-10 relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              {t('appointment.heading')}
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{t('appointment.success')}</h3>
                <p className="text-muted-foreground">We will contact you shortly to confirm your appointment.</p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)} 
                className="space-y-6 relative z-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2 text-foreground/80">
                      <User className="w-4 h-4 text-primary" /> {t('appointment.name')}
                    </label>
                    <input 
                      {...register('name')}
                      className={`w-full bg-background/50 border ${errors.name ? 'border-destructive' : 'border-border'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2 text-foreground/80">
                      <Mail className="w-4 h-4 text-primary" /> {t('appointment.email')}
                    </label>
                    <input 
                      type="email"
                      {...register('email')}
                      className={`w-full bg-background/50 border ${errors.email ? 'border-destructive' : 'border-border'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2 text-foreground/80">
                      <Phone className="w-4 h-4 text-primary" /> {t('appointment.phone')}
                    </label>
                    <input 
                      {...register('phone')}
                      className={`w-full bg-background/50 border ${errors.phone ? 'border-destructive' : 'border-border'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2 text-foreground/80">
                      <Calendar className="w-4 h-4 text-primary" /> {t('appointment.date')}
                    </label>
                    <input 
                      type="date"
                      {...register('date')}
                      className={`w-full bg-background/50 border ${errors.date ? 'border-destructive' : 'border-border'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">
                    {t('appointment.service')}
                  </label>
                  <select 
                    {...register('service')}
                    className={`w-full bg-background/50 border ${errors.service ? 'border-destructive' : 'border-border'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none`}
                  >
                    <option value="">-- Select --</option>
                    <option value="whitening">{t('services.whitening')}</option>
                    <option value="implants">{t('services.implants')}</option>
                    <option value="ortho">{t('services.ortho')}</option>
                    <option value="cosmetic">{t('services.cosmetic')}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-foreground/80">
                    <MessageSquare className="w-4 h-4 text-primary" /> {t('appointment.message')}
                  </label>
                  <textarea 
                    {...register('message')}
                    rows={4}
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
                      </motion.div>
                      {t('appointment.submitting')}
                    </>
                  ) : (
                    t('appointment.submit')
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
