import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,                      // Render ke liye host expose kare
    port: process.env.PORT || 5173,
   allowedHosts: [
      'ai-assistant-i9z0.onrender.com', // Add your Render domain here
      'localhost'
    ] }, // Render assigned port
  preview: {
    host: true,                      // Production preview ke liye
    port: process.env.PORT || 4173,
    allowedHosts: [
      'ai-assistant-i9z0.onrender.com',
      'localhost'
    ]
  },
})
