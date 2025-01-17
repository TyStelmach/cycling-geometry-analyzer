import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  publicDir: 'public',
  define: {
    'process.env.BASE_PATH': JSON.stringify(process.env.NODE_ENV === 'production' ? './' : './public/')
  }
});

