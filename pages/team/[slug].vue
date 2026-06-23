<script setup lang="ts">
import { siGithub, siX, siDiscord, siMatrix, siTelegram, siBilibili, siGmail } from 'simple-icons'

const route = useRoute()
const localePath = useLocalePath()
const { member } = useMember(route.params.slug as string)
const { t } = useI18n()

if (!member.value) {
  throw createError({ statusCode: 404, statusMessage: 'Member not found' })
}

const iconMap = {
  github: siGithub.path,
  x: siX.path,
  discord: siDiscord.path,
  matrix: siMatrix.path,
  telegram: siTelegram.path,
  bilibili: siBilibili.path,
  email: siGmail.path,
} as const

const socialLinks = computed(() => {
  const m = member.value!
  const links: Array<{ label: string; url: string; icon: string }> = []
  if (m.github) {
    links.push({
      label: 'GitHub',
      url: `https://github.com/${m.github}`,
      icon: iconMap.github,
    })
  }
  if (m.twitter) {
    links.push({
      label: 'Twitter',
      url: `https://twitter.com/${m.twitter}`,
      icon: iconMap.x,
    })
  }
  if (m.website) {
    links.push({
      label: new URL(m.website).hostname,
      url: m.website,
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
    })
  }
  if (m.matrix) {
    links.push({
      label: 'Matrix',
      url: `https://matrix.to/#/${m.matrix}`,
      icon: iconMap.matrix,
    })
  }
  if (m.discord) {
    links.push({
      label: 'Discord',
      url: `https://discord.gg/${m.discord}`,
      icon: iconMap.discord,
    })
  }
  if (m.telegram) {
    links.push({
      label: 'Telegram',
      url: `https://t.me/${m.telegram}`,
      icon: iconMap.telegram,
    })
  }
  if (m.bilibili) {
    links.push({
      label: 'Bilibili',
      url: `https://space.bilibili.com/${m.bilibili}`,
      icon: iconMap.bilibili,
    })
  }
  if (m.email) {
    links.push({
      label: 'Email',
      url: `mailto:${atob(m.email)}`,
      icon: iconMap.email,
    })
  }
  return links
})

useHead(() => ({
  title: `${member.value?.name || ''} — Trans-Helper`,
  script: member.value ? [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: member.value.name,
        givenName: member.value.github || undefined,
        description: member.value.role,
        knowsAbout: member.value.bio,
        sameAs: [
          member.value.github ? `https://github.com/${member.value.github}` : undefined,
          member.value.twitter ? `https://twitter.com/${member.value.twitter}` : undefined,
          member.value.website || undefined,
        ].filter(Boolean),
      }),
    },
  ] : [],
}))

defineOgImage('OgImageDefault', {
  title: member.value?.name || '',
  description: member.value?.role || '',
})
</script>

<template>
  <div v-if="member" class="relative z-10 mx-auto max-w-4xl px-6 py-32">
    <NuxtLink
      :to="localePath({ name: 'team' })"
      class="animate-fade-up mb-12 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white"
      style="animation-delay: 0.05s"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      {{ t('team.back') }}
    </NuxtLink>

    <div class="flex animate-fade-up flex-col items-center text-center sm:flex-row sm:items-start sm:text-left" style="animation-delay: 0.12s">
      <div v-if="member.github" class="h-32 w-32 sm:h-40 sm:w-40">
        <img
          :src="useAvatarUrl(member.github)"
          :alt="member.name"
          class="h-32 w-32 rounded-full bg-zinc-200 shadow-lg transition-transform duration-300 hover:scale-105 sm:h-40 sm:w-40 dark:bg-zinc-800"
        />
      </div>
      <div class="mt-6 sm:mt-0 sm:ml-10">
        <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ member.name }}</h1>
        <p class="mt-2 text-lg text-fuchsia-600 dark:text-fuchsia-400/80">{{ member.role }}</p>
        <p class="mt-1 max-w-lg text-sm italic text-zinc-600 dark:text-zinc-400">&ldquo;{{ member.motto }}&rdquo;</p>
        <div v-if="socialLinks.length" class="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
          <a
            v-for="link in socialLinks"
            :key="link.url"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group inline-flex items-center justify-center rounded-full border border-zinc-300 p-2 text-xs text-zinc-600 transition-all duration-300 hover:scale-110 hover:border-fuchsia-500 hover:text-fuchsia-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-fuchsia-500/50 dark:hover:text-white"
            :aria-label="link.label"
          >
            <svg class="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path :d="link.icon" />
          </svg>
            <span class="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:ml-1.5 group-hover:max-w-32">{{ link.label }}</span>
          </a>
        </div>
      </div>
    </div>

    <div class="mt-16 border-t border-zinc-200 pt-12 dark:border-zinc-800 animate-fade-up" style="animation-delay: 0.2s">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="prose prose-zinc max-w-none dark:prose-invert prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-zinc-800 prose-code:before:content-none prose-code:after:content-none dark:prose-code:bg-zinc-800 dark:prose-code:text-zinc-200" v-html="member.bio" />
    </div>
  </div>
</template>
