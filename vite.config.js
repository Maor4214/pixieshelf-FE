import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../pixieshelf BE/public',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: 'localhost',
    cors: true,
    proxy: {
      // Optional: You can also proxy API calls to backend if needed
      '/api': {
        target: 'http://localhost:3031',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
