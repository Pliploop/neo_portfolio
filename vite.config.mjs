import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'REACT_APP_'],
  server: { port: 3000 },
  build: { outDir: 'build', target: 'es2020' },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.test.{js,jsx}'],
    css: false,
    coverage: {
      provider: 'v8',
      include: ['src/fx/**', 'src/hooks/**', 'src/ui/**', 'src/data/**', 'src/pages/**'],
      exclude: ['src/fx/glRenderer.js', '**/*.test.*'],
    },
  },
});
