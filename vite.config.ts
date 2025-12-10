import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// const isTauri = process.env.TAURI_ENV === 'true';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Разработка ПО',
        short_name: 'softwaredevfrontend',
        description: 'Профессиональные услуги по разработке программного обеспечения',
        theme_color: '#76B900',
        start_url: '/iu5_5semester_frontend/',
        scope: '/iu5_5semester_frontend/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallback: '/iu5_5semester_frontend/index.html'
      }
    })
  ],
  base: '/iu5_5semester_frontend/',
  server: {
    port: 3000,
    host: true,
    strictPort: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})