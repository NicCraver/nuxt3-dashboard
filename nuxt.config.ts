// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    '@vueuse/nuxt',
  ],
  devServer: {
    port: 3030,
  },
  prisma: {
    autoSetupPrisma:true
  },
  devtools: { enabled: true },
})