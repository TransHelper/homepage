<script setup lang="ts">
import { marked } from "marked";

const README_URL = "https://raw.githubusercontent.com/TransHelper/.github/refs/heads/main/profile/README.md";

const { data: raw, pending, error } = await useFetch<string>(README_URL);

const html = computed(() => {
  if (!raw.value) return "";
  return marked.parse(raw.value) as string;
});

useHead({
  title: "TransHelper",
});

defineOgImage("OgImageDefault", {
  title: "TransHelper",
});
</script>

<template>
  <section class="relative z-10 mx-auto min-h-[calc(100vh-5rem)] max-w-4xl px-6 py-32">
    <div v-if="pending" class="flex items-center justify-center py-20">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-fuchsia-500 border-t-transparent" />
    </div>

    <div v-else-if="error" class="flex flex-col items-center gap-4 py-20 text-center">
      <svg class="h-12 w-12 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
      <p class="text-zinc-600 dark:text-zinc-400">Failed to load content. Please try again later.</p>
    </div>

    <div
      v-else-if="html"
      class="prose prose-zinc mx-auto max-w-none dark:prose-invert animate-fade-up"
      style="animation-delay: 0.1s"
      v-html="html"
    />
  </section>
</template>
