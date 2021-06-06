<template>
  <card-widget class="content-card">
    <slot />
  </card-widget>
</template>

<script setup>
import CardWidget from "./CardWidget.vue";
</script>

<style lang="postcss" scoped>
.content-card {
  @apply py-8 px-8;
}
</style>