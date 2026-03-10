import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollToTop from './components/subcomponents/scrolltotop';

const Loader = React.lazy(() => import('./components/Loading'));
const AboutPage = React.lazy(() => import('./components/AboutPage'));
const Projects = React.lazy(() => import('./components/Projects'));
const AcademiaSection = React.lazy(() => import('./components/Academia'));
const MusicSection = React.lazy(() => import('./components/Music'));
const Blog = React.lazy(() => import('./components/Blog'));

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

const pageTransition = { duration: 0.25, ease: 'easeOut' };

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
        <AnimatedRoutes />
      </React.Suspense>
    </Router>
  );
};

export default App;
