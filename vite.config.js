import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/01/',
  plugins: [
    uni(),
  ],
  build: {
    outDir: 'dist/build/h5',
    assetsDir: 'static',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'static/js/[name].[hash].js',
        chunkFileNames: 'static/js/[name].[hash].js',
        assetFileNames: 'static/[ext]/[name].[hash].[ext]'
      }
    }
  }
})
