import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronLeft, ChevronRight, Calendar, Phone } from 'lucide-react';

import slide1 from '@/assets/images/hero-slide-1.png';
import slide2 from '@/assets/images/hero-slide-2.png';
import slide3 from '@/assets/images/hero-slide-3.png';
import slide4 from '@/assets/images/hero-slide-4.png';

interface Slide {
  id: number;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  overlay: string;
  accent: string;
}

const slides: Slide[] = [
  {
    id: 0,
    image: slide1,
    badge: 'Welcome to SmileCare',
    title: 'The Future of\nDentistry, Today.',
    subtitle: 'Experience luxury dental care combined with cutting-edge technology in an environment designed for your comfort.',
    overlay: 'from-black/80 via-black/50 to-transparent',
    accent: 'from-cyan-500 to-blue-500',
  },
  {
    id: 1,
    image: slide2,
    badge: 'Advanced Technology',
    title: 'State-of-the-Art\nTreatment Rooms.',
    subtitle: 'Our clinic features the most advanced dental equipment available, ensuring precision, safety, and comfort in every procedure.',
    overlay: 'from-black/75 via-black/45 to-black/20',
    accent: 'from-blue-400 to-purple-500',
  },
  {
    id: 2,
    image: slide3,
    badge: 'Smile Transformation',
    title: 'Your Perfect Smile\nIs Our Mission.',
    subtitle: 'From teeth whitening to full smile makeovers — we craft beautiful, natural-looking results that last a lifetime.',
    overlay: 'from-black/80 via-black/55 to-transparent',
    accent: 'from-emerald-400 to-cyan-500',
  },
  {
    id: 3,
    image: slide4,
    badge: 'Expert Team',
    title: '20+ World-Class\nSpecialists.',
    subtitle: 'Our internationally trained team of dentists brings decades of combined experience and a passion for exceptional patient care.',
    overlay: 'from-black/80 via-black/50 to-transparent',
    accent: 'from-cyan-400 to-teal-400',
  },
];

const AUTOPLAY_INTERVAL = 5500;

export function HeroSection() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number, dir: 1 | -1 = 1) => {
    setDirection(dir);
    setCurrent(index);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1);
  }, [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(next, AUTOPLAY_INTERVAL);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next, isPaused]);

  // Progress bar
  useEffect(() => {
    setProgress(0);
    if (isPaused) return;
    const start = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100));
    }, 50);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [current, isPaused]);

  const slide = slides[current];

  const bgVariants = {
    enter: (dir: number) => ({ opacity: 0, scale: 1.08, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, scale: 1.04, x: 0 },
    exit: (dir: number) => ({ opacity: 0, scale: 1, x: dir > 0 ? -60 : 60 }),
  };

  const contentVariants = {
    enter: (dir: number) => ({ opacity: 0, y: 40, x: dir > 0 ? 30 : -30 }),
    center: { opacity: 1, y: 0, x: 0 },
    exit: (dir: number) => ({ opacity: 0, y: -30, x: dir > 0 ? -20 : 20 }),
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── SLIDES ── */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={`bg-${current}`}
          custom={direction}
          variants={bgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 will-change-transform"
        >
          {/* Background image with Ken Burns zoom */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
            animate={{ scale: [1.04, 1.12] }}
            transition={{ duration: AUTOPLAY_INTERVAL / 1000 + 1.1, ease: 'linear' }}
          />

          {/* Primary dark gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />

          {/* Bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

          {/* Cyan accent glow bottom-left */}
          <div className={`absolute bottom-0 left-0 w-96 h-64 bg-gradient-to-tr ${slide.accent} opacity-10 blur-3xl`} />
        </motion.div>
      </AnimatePresence>

      {/* ── SLIDE CONTENT ── */}
      <div className="relative z-10 w-full container mx-auto px-6 md:px-12 pt-24 pb-32">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`content-${current}`}
            custom={direction}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-sm font-medium mb-6 tracking-wide"
            >
              <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${slide.accent} animate-pulse`} />
              {slide.badge}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.65 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight mb-6 whitespace-pre-line"
            >
              {slide.title.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span className={`bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent`}>
                      {line}
                    </span>
                  ) : line}
                </span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-white/75 mb-10 max-w-xl leading-relaxed"
            >
              {slide.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <a
                href="#appointment"
                data-testid="button-book-appointment"
                className={`group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r ${slide.accent} shadow-lg hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all duration-300`}
              >
                <Calendar className="w-4 h-4" />
                {t('hero.bookBtn')}
              </a>
              <a
                href="#about"
                data-testid="button-contact-us"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                {t('hero.watchBtn')}
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/15"
            >
              {[
                { value: '5K+', label: t('hero.stats.patients') },
                { value: '15+', label: t('hero.stats.experience') },
                { value: '20+', label: t('hero.stats.specialists') },
                { value: '50+', label: t('hero.stats.awards') },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                  <p className="text-xs text-white/55 font-medium uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── SLIDE COUNTER (top-right) ── */}
      <div className="absolute top-28 right-8 z-20 hidden md:flex flex-col items-end gap-1">
        <span className="text-5xl font-black text-white/20 leading-none">
          0{current + 1}
        </span>
        <span className="text-xs text-white/40 tracking-widest uppercase">/ 0{slides.length}</span>
      </div>

      {/* ── NAVIGATION ARROWS ── */}
      <button
        onClick={prev}
        data-testid="button-slider-prev"
        aria-label="Previous slide"
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        data-testid="button-slider-next"
        aria-label="Next slide"
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ── DOT INDICATORS ── */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            data-testid={`button-slide-dot-${i}`}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-1 rounded-full overflow-hidden transition-all duration-500 focus:outline-none"
            style={{ width: i === current ? '48px' : '24px' }}
          >
            <span className="absolute inset-0 bg-white/30 rounded-full" />
            {i === current && (
              <motion.span
                className={`absolute inset-y-0 left-0 bg-gradient-to-r ${slide.accent} rounded-full`}
                style={{ width: `${progress}%` }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── THUMBNAIL STRIP (desktop) ── */}
      <div className="absolute bottom-5 right-6 z-20 hidden lg:flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            data-testid={`button-slide-thumb-${i}`}
            className={`w-16 h-10 rounded-md overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
              i === current ? 'border-cyan-400 scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
            }`}
          >
            <img src={s.image} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* ── SCROLL CUE ── */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-20 left-8 z-20 hidden md:flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-medium [writing-mode:vertical-lr] rotate-180">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.a>
    </section>
  );
}
