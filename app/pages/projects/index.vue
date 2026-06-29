<script setup lang="ts">
const { t } = useI18n()

interface Repo {
  name: string
  description: string
  url: string
  language: string
  stars: number
  topics: string[]
  homepage: string
}

const { data: repos, pending, error } = await useFetch<Repo[]>('/api/repos')

useHead({
  title: `${t('projects.title')} — TransHelper`,
})

defineOgImage('OgImageDefault', {
  title: t('projects.title'),
  description: t('projects.subtitle'),
})
</script>

<template>
  <section class="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col items-center px-6 py-32">
    <div class="mb-16 text-center animate-fade-up" style="animation-delay: 0.1s">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl text-zinc-900 dark:text-white">{{ t('projects.title') }}</h2>
      <p class="mt-3 text-zinc-600 dark:text-zinc-500">{{ t('projects.subtitle') }}</p>
    </div>

    <div v-if="pending" class="flex items-center justify-center py-20">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-fuchsia-500 border-t-transparent" />
    </div>

    <div v-else-if="error" class="flex flex-col items-center gap-4 py-20 text-center">
      <svg class="h-12 w-12 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      <p class="text-zinc-600 dark:text-zinc-400">{{ t('projects.error') }}</p>
    </div>

    <div v-else class="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="(repo, i) in repos || []"
        :key="repo.name"
        class="animate-fade-up group flex flex-col rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:shadow-zinc-900/30"
        :style="{ animationDelay: `${0.15 + i * 0.08}s` }"
      >
        <div class="flex items-start justify-between">
          <a
            :href="repo.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-lg font-semibold transition-colors hover:text-fuchsia-600 dark:hover:text-fuchsia-400"
          >
            {{ repo.name }}
          </a>
          <span class="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            <svg class="h-3 w-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            {{ repo.stars }}
          </span>
        </div>
        <p class="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{{ repo.description || t('projects.noDescription') }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-if="repo.language"
            class="inline-block rounded-full bg-fuchsia-500/10 px-2.5 py-0.5 text-xs text-fuchsia-600 dark:text-fuchsia-400"
          >
            {{ repo.language }}
          </span>
          <span
            v-for="topic in repo.topics.slice(0, 3)"
            :key="topic"
            class="inline-block rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
          >
            {{ topic }}
          </span>
        </div>
      </article>
    </div>

    <div v-if="repos && repos.length === 0" class="mt-16 text-center text-zinc-500">
      {{ t('projects.empty') }}
    </div>
  </section>
</template>
