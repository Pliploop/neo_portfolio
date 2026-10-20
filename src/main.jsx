import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/archivo';
import '@fontsource-variable/jetbrains-mono';
import './styles/index.css';
import App from './App';
import { installDitherMasks } from './fx/ditherMasks';

installDitherMasks();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
