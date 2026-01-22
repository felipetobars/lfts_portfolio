import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base' is crucial for GitHub Pages. 
  // Setting it to '/lfts_portfolio/' makes asset links relative to the repo name
  base: '/lfts_portfolio/',
});
