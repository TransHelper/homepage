<script setup lang="ts">
import { siteConfig } from "~~/config/site";
import IconGithub from "./components/IconGithub.vue";
import IconTwitter from "./components/IconTwitter.vue";
import IconDiscord from "./components/IconDiscord.vue";

const { locale, setLocale } = useI18n();
const localePath = useLocalePath();
const colorMode = useColorMode();

const discordLink = siteConfig.social.discord ? `https://discord.gg/${siteConfig.social.discord}` : undefined;
const navOpen = ref(false);

const localeOptions = [
  { code: "en", name: "English" },
  { code: "zh", name: "简体中文" },
  { code: "es", name: "Español" },
  { code: "ca", name: "Català" },
];

function onLocaleChange(event: Event) {
  const newLocale = (event.target as HTMLSelectElement).value;
  setLocale(newLocale);
}

function toggleTheme() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

useHead(() => ({
  meta: [{ property: "og:locale", content: locale.value === "en" ? "en_US" : "zh_CN" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "TransHelper",
        url: "https://transhelper.org",
        description: "Building practical open-source software and infrastructure for the transgender community.",
        logo: "https://transhelper.org/favicon.png",
        sameAs: ["https://github.com/TransHelper"],
      }),
    },
  ],
}));
</script>

<template>
  <div
    class="relative min-h-screen overflow-hidden bg-zinc-50 font-sans text-zinc-900 dark:bg-[#0a0a12] dark:text-white"
  >
    <div class="pointer-events-none fixed inset-0 z-0">
      <div
        class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[length:64px_64px] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white dark:via-[#0a0a12]/80 dark:to-[#0a0a12]"
      />
      <div class="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[128px]" />
      <div class="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-500/10 blur-[128px]" />
    </div>

    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:left-4 focus:top-4 focus:rounded-full focus:bg-fuchsia-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-zinc-950"
    >
      Skip to content
    </a>

    <nav class="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <div class="flex items-center gap-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-500/20">
          <svg
            class="h-5 w-5 text-fuchsia-500 dark:text-fuchsia-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
        </div>
        <NuxtLink :to="localePath('/')" class="text-lg font-bold tracking-tight"
          ><span class="text-fuchsia-500 dark:text-fuchsia-400">Trans</span>Helper</NuxtLink
        >
      </div>

      <div class="hidden items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400 md:flex">
        <NuxtLink :to="localePath('/')" class="transition-colors hover:text-zinc-900 dark:hover:text-white">{{
          $t("nav.home")
        }}</NuxtLink>
        <NuxtLink :to="localePath('/projects')" class="transition-colors hover:text-zinc-900 dark:hover:text-white">{{
          $t("nav.projects")
        }}</NuxtLink>
        <NuxtLink :to="localePath('/team')" class="transition-colors hover:text-zinc-900 dark:hover:text-white">{{
          $t("nav.team")
        }}</NuxtLink>
        <NuxtLink :to="localePath('/conduct')" class="transition-colors hover:text-zinc-900 dark:hover:text-white">{{
          $t("nav.conduct")
        }}</NuxtLink>
        <a
          v-if="discordLink"
          :href="discordLink"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-full border border-zinc-300 px-5 py-2 transition-colors hover:border-fuchsia-500 hover:text-fuchsia-600 dark:border-zinc-700 dark:hover:border-fuchsia-500/50 dark:hover:text-white"
        >
          {{ $t("nav.contact") }}
        </a>
        <button
          class="rounded-full p-2 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800"
          :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          :title="colorMode.value === 'dark' ? 'Switch to light' : 'Switch to dark'"
          @click="toggleTheme"
        >
          <svg
            v-if="colorMode.value === 'dark'"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
          <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        </button>
        <select
          :value="locale"
          aria-label="Switch language"
          class="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-600 outline-none transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600"
          @change="onLocaleChange"
        >
          <option v-for="loc in localeOptions" :key="loc.code" :value="loc.code" class="bg-white dark:bg-zinc-900">
            {{ loc.name }}
          </option>
        </select>
      </div>

      <button
        class="flex items-center rounded-full p-2 transition-colors hover:bg-zinc-200 md:hidden dark:hover:bg-zinc-800"
        aria-label="Toggle navigation menu"
        @click="navOpen = !navOpen"
      >
        <svg v-if="!navOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <div
      v-if="navOpen"
      class="relative z-10 border-t border-zinc-200 bg-zinc-50 px-6 pb-6 md:hidden dark:border-zinc-900 dark:bg-[#0a0a12]"
    >
      <div class="mx-auto flex max-w-6xl flex-col gap-4 pt-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        <NuxtLink
          :to="localePath('/')"
          class="transition-colors hover:text-zinc-900 dark:hover:text-white"
          @click="navOpen = false"
          >{{ $t("nav.home") }}</NuxtLink
        >
        <NuxtLink
          :to="localePath('/projects')"
          class="transition-colors hover:text-zinc-900 dark:hover:text-white"
          @click="navOpen = false"
          >{{ $t("nav.projects") }}</NuxtLink
        >
        <NuxtLink
          :to="localePath('/team')"
          class="transition-colors hover:text-zinc-900 dark:hover:text-white"
          @click="navOpen = false"
          >{{ $t("nav.team") }}</NuxtLink
        >
        <NuxtLink
          :to="localePath('/conduct')"
          class="transition-colors hover:text-zinc-900 dark:hover:text-white"
          @click="navOpen = false"
          >{{ $t("nav.conduct") }}</NuxtLink
        >
        <a
          v-if="discordLink"
          :href="discordLink"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center self-start rounded-full border border-zinc-300 px-5 py-2 transition-colors hover:border-fuchsia-500 hover:text-fuchsia-600 dark:border-zinc-700 dark:hover:border-fuchsia-500/50 dark:hover:text-white"
          @click="navOpen = false"
        >
          {{ $t("nav.contact") }}
        </a>
        <div class="flex items-center gap-4 pt-2">
          <button
            class="rounded-full p-2 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800"
            :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            :title="colorMode.value === 'dark' ? 'Switch to light' : 'Switch to dark'"
            @click="toggleTheme"
          >
            <svg
              v-if="colorMode.value === 'dark'"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
            <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          </button>
          <select
            :value="locale"
            aria-label="Switch language"
            class="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-600 outline-none transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600"
            @change="onLocaleChange"
          >
            <option v-for="loc in localeOptions" :key="loc.code" :value="loc.code" class="bg-white dark:bg-zinc-900">
              {{ loc.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <NuxtPage id="main-content" />

    <footer class="relative z-10 border-t border-zinc-200 px-6 py-12 dark:border-zinc-900">
      <div class="mx-auto flex max-w-6xl flex-col items-center gap-8 sm:flex-row sm:justify-between">
        <div class="text-xs text-zinc-500 dark:text-zinc-700">
          &copy; {{ new Date().getFullYear() }} TransHelper. {{ $t("footer.copyright") }}
        </div>
        <div class="flex items-center gap-6">
          <a
            href="https://github.com/TransHelper"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white"
            aria-label="GitHub"
          >
            <IconGithub />
            {{ $t("social.github") }}
          </a>
          <a
            v-if="siteConfig.social.twitter"
            :href="`https://twitter.com/${siteConfig.social.twitter}`"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white"
            aria-label="Twitter"
          >
            <IconTwitter />
            {{ $t("social.twitter") }}
          </a>
          <a
            v-if="discordLink"
            :href="discordLink"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white"
            aria-label="Discord"
          >
            <IconDiscord />
            {{ $t("social.discord") }}
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
:root {
  scroll-behavior: smooth;
}

::selection {
  background-color: rgba(217, 70, 239, 0.25);
  color: inherit;
}

.dark ::selection {
  background-color: rgba(217, 70, 239, 0.35);
}

*:focus-visible {
  outline: 2px solid rgb(217 70 239);
  outline-offset: 2px;
  border-radius: 4px;
}

.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
