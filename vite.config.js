import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      build: {
        minify: 'terser', // Enable minification for smaller bundle size
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                return 'vendor'; // Separate vendor dependencies
              }
            },
          },
        },
      },
    })
