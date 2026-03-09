import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/subcomponents/scrolltotop';

const Loader = React.lazy(() => import('./components/Loading'));
const AboutPage = React.lazy(() => import('./components/AboutPage'));
const Projects = React.lazy(() => import('./components/Projects'));
const AcademiaSection = React.lazy(() => import('./components/Academia'));
const MusicSection = React.lazy(() => import('./components/Music'));
const Blog = React.lazy(() => import('./components/Blog'));

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <React.Suspense fallback={<div className="h-screen w-screen bg-white dark:bg-gray-900" />}>
        <Routes>
          <Route path="/" element={<Loader />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/academia" element={<AcademiaSection />} />
          <Route path="/music" element={<MusicSection />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
};

export default App;
