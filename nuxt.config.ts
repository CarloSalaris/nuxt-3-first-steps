// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  modules: ["@vueuse/nuxt", "@nuxtjs/supabase"],

  supabase: {
    /* redirect: false, */
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/", "/course/chapter/1-chapter-1/*"],
    },
  },
});
