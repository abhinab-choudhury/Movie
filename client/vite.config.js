import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [
      "5173-01kjqnyn3ntkacmrf9qxpngja0.cloudspaces.litng.ai"
    ]
  },
  plugins: [react()],
  base: '/'
});
