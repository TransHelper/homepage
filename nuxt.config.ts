export default defineNuxtConfig({
  compatibilityDate: "2026-06-20",
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    head: {
      title: "TransHelper",
      meta: [
        {
          name: "description",
          content: "Building practical open-source software and infrastructure for the transgender community.",
        },
        { property: "og:title", content: "TransHelper" },
        {
          property: "og:description",
          content: "Building practical open-source software and infrastructure for the transgender community.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://transhelper.org" },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "TransHelper" },
        {
          name: "twitter:description",
          content: "Building practical open-source software and infrastructure for the transgender community.",
        },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "apple-touch-icon", href: "/favicon.png" },
      ],
    },
  },
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "dark",
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxtjs/sitemap",
    "nuxt-og-image",
  ],
  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.json", name: "English" },
      { code: "zh", iso: "zh-CN", file: "zh-CN.json", name: "简体中文" },
    ],
    defaultLocale: "zh",
    langDir: "locales",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
  googleFonts: {
    families: {
      Syne: [400, 600, 700],
      "DM Sans": [400, 500, 600],
      "Noto Sans SC": [400, 500, 700],
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
  },
  ogImage: {
    zeroRuntime: true,
  },

  postcss: {
    plugins: {
      "@tailwindcss/postcss": false,
    },
  },

  nitro: {
    preset: "cloudflare-pages",
  },
  vite: {
    optimizeDeps: {
      include: ["marked"],
    },
    server: {
      allowedHosts: ["vite.rhencloud.dev"],
    },
  },
});
