<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div
    style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; background: #0a0a12; font-family: 'DM Sans', 'Noto Sans SC', sans-serif; position: relative;"
  >
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
      <div
        style="display: flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 14px; background: rgba(217, 70, 239, 0.15);"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d946ef" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      </div>
      <span style="font-size: 48px; font-weight: 700; color: #d946ef; letter-spacing: -0.02em;">
        Trans-
      </span>
      <span style="font-size: 48px; font-weight: 700; color: white; letter-spacing: -0.02em;">
        Helper
      </span>
    </div>

      <div style="width: 80px; height: 3px; border-radius: 2px; background: linear-gradient(to right, #d946ef, #8b5cf6); margin-bottom: 24px;" />

    <div v-if="title" style="font-size: 32px; font-weight: 600; color: white; text-align: center; max-width: 80%; margin-bottom: 12px;">
      {{ title }}
    </div>

    <div v-if="description" style="font-size: 22px; color: #a1a1aa; text-align: center; max-width: 70%;">
      {{ description }}
    </div>
    <div v-else style="font-size: 22px; color: #a1a1aa; text-align: center; max-width: 70%;">
      Building practical open-source software and infrastructure for the transgender community.
    </div>
  </div>
</template>
