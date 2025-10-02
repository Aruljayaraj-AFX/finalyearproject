import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,            // allow network access
    port: 5173,            // your Vite dev server port
    strictPort: true,      // fail if port 5173 is in use
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.ngrok-free.app'    // allow any ngrok subdomain
    ]
  }
})
