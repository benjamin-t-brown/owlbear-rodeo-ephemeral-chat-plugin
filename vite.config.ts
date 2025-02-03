import { defineConfig } from 'vite';

const rootPath = './';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'owlbear-rodeo-ephemeral-chat-plugin',
  plugins: [],
  build: {
    outDir: rootPath + 'dist',
    assetsDir: 'release',
    cssCodeSplit: false,
    sourcemap: true,
  },
  server: {
    cors: true,
    host: '0.0.0.0',
    open: 'index.html',
    watch: {
      usePolling: true,
    },
  },
});
