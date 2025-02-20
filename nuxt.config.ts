import { myPreset } from "./theme/myPreset"
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@primevue/nuxt-module",
    "@vee-validate/nuxt",
    "@nuxt/icon",
  ],
  primevue: {
    autoImport: true,
    usePrimeVue: true,
    options: {
      theme: {
        preset: myPreset,
        // cssLayer: false,
        options: {
          darkModeSelector: ".my-app-dark",
          cssLayer: {
            name: "primevue",
            order: "tailwind-base, primevue, tailwind-utilities",
          },
        },
      },
      ripple: true,
    },
  },
  runtimeConfig: {
    public: {
      siteName: "bd funnel builder order",
      apiBaseUrl: process.env.NUXT_API_BASE_URL || "https://bdf-orderapi.bdfunnelbuilder.com/",
    },
  },
});