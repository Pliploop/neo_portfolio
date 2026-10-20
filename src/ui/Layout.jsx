import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import Grain from '../fx/Grain';

export default function Layout({ children }) {
  const { pathname, hash } = useLocation();
  const bare = pathname === '/';

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] brut bg-paper rounded-full px-4 py-2 meta">
        Skip to content
      </a>
      <Grain />
      {bare ? null : <Nav />}
      <main id="main" className={bare ? '' : 'pt-28 sm:pt-36'}>{children}</main>
      {bare ? null : <Footer />}
    </>
  );
}
