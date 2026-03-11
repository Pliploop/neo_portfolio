import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MeshGradientRenderer } from '@johnn-e/react-mesh-gradient';
import NoiseOverlay from './components/subcomponents/NoiseOverlay';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollToTop from './components/subcomponents/scrolltotop';

const Loader = React.lazy(() => import('./components/Loading'));
const AboutPage = React.lazy(() => import('./components/AboutPage'));
const Projects = React.lazy(() => import('./components/Projects'));
const AcademiaSection = React.lazy(() => import('./components/Academia'));
const MusicSection = React.lazy(() => import('./components/Music'));
const Blog = React.lazy(() => import('./components/Blog'));

const GRADIENT_COLORS = ["#FEA4B0", "#FECC96", "#FFFFFF", "#FFE8F0", "#FFF2B8"];
const LOADING_GRADIENT_STYLE = { position: 'absolute', inset: 0, width: '50%', height: '50%', top: '25%', left: '25%' };

const LoadingGradient = () => {
  const { pathname } = useLocation();
  if (pathname !== '/') return null;
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 28% 32% at center, black 20%, rgba(0,0,0,0.05) 65%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(ellipse 28% 32% at center, black 20%, rgba(0,0,0,0.05) 65%, transparent 90%)',
      }}
    >
      <MeshGradientRenderer colors={GRADIENT_COLORS} style={LOADING_GRADIENT_STYLE} speed={0.04} />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
      >
        <NoiseOverlay opacity={0.65} blendMode="overlay" baseFrequency="0.85" />
      </motion.div>
    </div>
  );
};

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

const pageTransition = { duration: 0.35, ease: 'easeInOut' };

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <Routes location={location}>
          <Route path="/" element={<Loader />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/academia" element={<AcademiaSection />} />
          <Route path="/music" element={<MusicSection />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <React.Suspense fallback={<div className="h-screen w-screen bg-white dark:bg-gray-900" />}>
        <LoadingGradient />
        <AnimatedRoutes />
      </React.Suspense>
    </Router>
  );
};

export default App;
