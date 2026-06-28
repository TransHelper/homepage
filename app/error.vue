<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message?: string } }>()
const localePath = useLocalePath()

function goBack() {
  window.history.back()
}

const messages: Record<number, { title: string; desc: string }> = {
  404: {
    title: 'Page not found',
    desc: 'The page you are looking for does not exist or has been moved.',
  },
  500: {
    title: 'Server error',
    desc: 'Something went wrong on our end. Please try again later.',
  },
}

const err = computed(() => (messages[props.error.statusCode] ?? messages[500])!)
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-zinc-50 font-sans dark:bg-[#0a0a12] dark:text-white">
    <div class="pointer-events-none fixed inset-0 z-0">
      <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[length:64px_64px] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white dark:via-[#0a0a12]/80 dark:to-[#0a0a12]" />
    </div>

    <div class="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <span class="text-[10rem] font-black leading-none tracking-tight text-zinc-200 dark:text-zinc-800 select-none">{{ error.statusCode }}</span>

      <h1 class="-mt-8 text-2xl font-bold tracking-tight sm:text-3xl">{{ err.title }}</h1>
      <p class="mt-4 max-w-md text-zinc-600 dark:text-zinc-400">{{ err.desc }}</p>

      <div class="mt-10 flex items-center gap-4">
        <NuxtLink
          :to="localePath('/')"
          class="inline-flex items-center gap-2 rounded-full bg-fuchsia-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-all duration-300 hover:bg-fuchsia-400 hover:shadow-lg hover:shadow-fuchsia-500/25 active:scale-95"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to home
        </NuxtLink>
        <button
          class="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-600 transition-all duration-300 hover:border-zinc-400 hover:text-zinc-900 active:scale-95 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-white"
          @click="goBack"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Go back
        </button>
      </div>
    </div>
  </div>
</template>
