<template>
  <card-widget class="statistic-card">
    <div class="headline">
      <slot name="headline" />
    </div>
    <slot />
  </card-widget>
</template>

<script setup>
import CardWidget from "./CardWidget.vue";
</script>

<style lang="postcss" scoped>
.statistic-card {
  @apply py-5 px-6;
}

.statistic-card .headline {
  @apply text-lg leading-loose mb-2 text-gray-600;
}
</style>