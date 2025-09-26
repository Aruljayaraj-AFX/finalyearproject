import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow network access
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.ngrok-free.app' // allow any ngrok subdomain
    ],
    proxy: {
      // Proxy all /Growspire requests to your ngrok backend
      '/Growspire': {
        target: 'https://43d018ad10e0.ngrok-free.app',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
