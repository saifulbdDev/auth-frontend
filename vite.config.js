import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  preview: {
    port: 3000,
  },
  server: {
    host: true,
    port: 3000,
    // proxy: {
    //   // with options:  PUBLIC_BACKEND_URL
    //   "/v3": {
    //     target: env.VITE_APP_API,
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    //   "/broadcasting": {
    //     target: env.VITE_APP_API,
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    //   "/sanctum": {
    //     target: env.VITE_APP_API,
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
  

  // build: {
  //   target: 'esnext',
  //   rollupOptions: {
  //       output:{
  //           manualChunks(id) {
  //               if (id.includes('node_modules')) {
  //                   return id.toString().split('node_modules/')[1].split('/')[0].toString();
  //               }
  //           }
  //       }
  //   }

 

})