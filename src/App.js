import React from 'react';
import { Outlet } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, 
  useLocation} from 'react-router-dom';
import Loader from './components/Loading';
import About from './components/About';
import Projects from './components/Projects';
import AcademiaSection from './components/Academia';
import MusicSection from './components/Music';
import Blog from './components/Blog';
import ScrollToTop from './components/subcomponents/scrolltotop';

import { motion } from "framer-motion"

const pageVariants = {
  initial: {
    opacity: 0.5
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0.5
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'linear',
  duration: 0.0
}; 

const AnimationLayout = () => {
  const { pathname } = useLocation();
  return (
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Outlet />
      </motion.div>
  );
};


const App = () => {

  
  return (
    <Router>
      <ScrollToTop />
      
      <Routes >
        <Route path="/" element={Loader} />
        <Route path="/about" element={About} />
        <Route path="/projects" element={Projects} />
        <Route path="/academia" element={AcademiaSection} />
        <Route path="/music" element={MusicSection} />
        <Route path="/blog" element={Blog} />
      </Routes>
    </Router>
  );
};

export default App;