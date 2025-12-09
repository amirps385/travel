// nuxt.config.ts
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  nitro: {
    esbuild: {
      options: {
        target: 'es2022' // Update target to support newer features
      }
    }
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
  },
})