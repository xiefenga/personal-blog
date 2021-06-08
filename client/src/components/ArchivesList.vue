<template>
  <div class="article-total">文章总览 - {{ articles }}</div>
</template>

<script setup>
import { computed } from "vue";
import { archives } from "@/store/article";

const articles = computed(() =>
  archives.value.reduce((acc, cur) => acc + cur[1].length, 0)
);
</script>


<style lang="postcss" scoped>
.article-total {
  @apply text-2xl;
}
</style>