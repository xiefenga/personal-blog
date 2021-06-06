<template>
  <card-widget class="archives">
    <div class="article-total">文章总览 - {{ articles }}</div>
  </card-widget>
</template>

<script setup>
import CardWidget from "./CardWidget.vue";
import { archives } from "@/store/archives";
import { computed } from "vue";
const articles = computed(() =>
  archives.reduce((acc, cur) => acc + cur[1].length, 0)
);
</script>


<style lang="postcss" scoped>
.archives {
  @apply py-8 px-8 leading-loose text-sm;
}

.archives .article-total {
  @apply text-2xl;
}
</style>