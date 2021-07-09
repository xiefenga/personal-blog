<template>
  <main>
    <div class="main-content" v-if="isHome">
      <slot></slot>
    </div>
    <card-widget v-else class="main-content">
      <slot></slot>
    </card-widget>
    <aside-content />
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import CardWidget from "@/components/CardWidget.vue";
import AsideContent from "@/components/AsideContent.vue";

const route = useRoute();
const isHome = computed(() => route.meta.home);
</script>

<style lang="postcss" scoped>
main {
  max-width: 1200px;
  @apply flex items-start py-8 px-4 m-auto;
}

main .main-content {
  @apply w-9/12;
}

main .aside-content {
  @apply box-content pl-4 w-3/12;
}
</style>