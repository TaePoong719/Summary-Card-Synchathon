import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/850': {
        target: 'https://8508958360.for-seoul.synctreengine.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/850/, ''),
        secure: false,
        ws: true,
      },
      '/api/246': {
        target: 'https://2468280591.for-seoul.synctreengine.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/246/, ''),
        secure: false,
        ws: true,
      },
      '/api/904': {
        target: 'https://9042753645.for-seoul.synctreengine.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/904/, ''),
        secure: false,
        ws: true,
      },
    },
  },
})
