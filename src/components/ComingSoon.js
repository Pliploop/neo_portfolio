import React from 'react';
import AllHeader from './subcomponents/header';

const ComingSoon = ({ pagename }) => (
  <div className="dark:bg-gray-900 dark:text-white min-h-screen lg:py-12 lg:px-32 p-6">
    <AllHeader pagename={pagename} hoveraccent="" clickaccent="" />
    <div className="flex flex-col items-center justify-center h-64 mt-20">
      <p className="text-4xl font-bold mb-4 dark:text-white">{pagename}</p>
      <p className="text-gray-500 dark:text-gray-400">Coming soon.</p>
    </div>
  </div>
);

export default ComingSoon;
