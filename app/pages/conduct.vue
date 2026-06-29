<script setup lang="ts">
import { marked } from "marked";

const { t } = useI18n();
const { locale } = useI18n();

const files = import.meta.glob("/content/{en,zh}/conduct.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const html = computed(() => {
  const lang = locale.value.startsWith("zh") ? "zh" : "en";
  const raw = files[`/content/${lang}/conduct.md`];
  return raw ? (marked.parse(raw) as string) : "";
});

useHead({
  title: `${t("nav.conduct")} — TransHelper`,
});

defineOgImage("OgImageDefault", {
  title: t("nav.conduct"),
});
</script>

<template>
  <section class="relative z-10 mx-auto max-w-3xl px-6 py-32">
    <div
      v-if="html"
      class="prose prose-zinc mx-auto dark:prose-invert max-w-none prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-zinc-800 prose-code:before:content-none prose-code:after:content-none dark:prose-code:bg-zinc-800 dark:prose-code:text-zinc-200"
      v-html="html"
    />
    <div v-else class="text-center text-zinc-500">
      {{ t("nav.conduct") }}
    </div>
  </section>
</template>
