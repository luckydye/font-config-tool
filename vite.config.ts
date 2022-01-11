import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/configurator/index.html',
      formats: ['es']
    },
    // rollupOptions: {
    //   external: /^lit/
    // }
  }
})
