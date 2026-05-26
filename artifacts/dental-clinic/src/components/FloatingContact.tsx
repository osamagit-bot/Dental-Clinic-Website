import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function FloatingContact() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'fa' || i18n.language === 'ps';

  return (
    <div className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-40`}>
      <motion.a
        href="#appointment"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:shadow-green-500/50 transition-shadow"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute inset-0 rounded-full border-2 border-green-500 animate-ping opacity-75"></span>
      </motion.a>
    </div>
  );
}
