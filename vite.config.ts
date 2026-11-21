import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base relativo pra funcionar em qualquer repo do GitHub Pages
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        // Firebase em arquivo separado: o navegador guarda em cache entre deploys
        advancedChunks: { groups: [{ name: 'firebase', test: /node_modules[\\/](@?firebase)/ }] },
      },
    },
  },
})
