import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: '0.0.0.0',  // Allow external access (required for Docker)
    port: 5173,       // Explicit port
    hmr: {
      port: 5173      // Hot Module Replacement port
    },
    watch: {
      usePolling: true,   // Enable polling for file changes (helps with Docker on Windows)
      interval: 1000      // Poll every 1 second
    }
  }
})
