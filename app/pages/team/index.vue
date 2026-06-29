<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const { members } = useMembers();

useHead({
  title: `${t("team.title")} — TransHelper`,
});

defineOgImage("OgImageDefault", {
  title: t("team.title"),
  description: t("team.subtitle"),
});
</script>

<template>
  <section
    class="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col items-center justify-center px-6 py-32"
  >
    <div class="mb-16 text-center animate-fade-up" style="animation-delay: 0.1s">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl text-zinc-900 dark:text-white">{{ t("team.title") }}</h2>
      <p class="mt-3 text-zinc-600 dark:text-zinc-500">{{ t("team.subtitle") }}</p>
    </div>
    <div v-if="members.length === 0" class="text-center text-zinc-500">
      {{ t("team.empty") }}
    </div>
    <div v-else class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="(m, i) in members"
        :key="i"
        :to="localePath({ name: 'team-slug', params: { slug: m.slug } })"
        class="animate-fade-up group flex flex-col items-center rounded-2xl border border-transparent px-6 py-10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-zinc-200 hover:bg-zinc-100 hover:shadow-lg dark:hover:border-zinc-800 dark:hover:bg-zinc-900/50 dark:hover:shadow-zinc-900/30"
        :style="{ animationDelay: `${0.15 + i * 0.1}s` }"
      >
        <div v-if="m.github" class="h-20 w-20">
          <img
            :src="useAvatarUrl(m.github)"
            :alt="m.name"
            class="h-20 w-20 rounded-full bg-zinc-200 ring-2 ring-fuchsia-500/20 transition-all duration-300 group-hover:ring-fuchsia-500/40 group-hover:scale-105 dark:bg-zinc-800"
          />
        </div>
        <h3 class="mt-5 text-lg font-semibold transition-colors group-hover:text-zinc-900 dark:group-hover:text-white">
          {{ m.name }}
        </h3>
        <p class="mt-1 text-sm text-fuchsia-600 dark:text-fuchsia-400/80">{{ m.role }}</p>
        <p class="mt-3 max-w-xs text-sm leading-relaxed text-zinc-600 dark:text-zinc-500">
          &ldquo;{{ m.motto }}&rdquo;
        </p>
      </NuxtLink>
    </div>
  </section>
</template>
