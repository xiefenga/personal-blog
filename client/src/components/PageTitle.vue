<template>
  <div class="page-info">
    <h1 class="page-title">{{ title }}</h1>
    <daily-sentence />
  </div>
</template>

<script setup>
import DailySentence from "./DailySentence.vue";
import { siteInfo } from "@/store/site";
import { article } from "@/store/article";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
const title = siteInfo.name;
</script>

<style lang="postcss" scoped>
.page-info {
  @apply absolute w-full text-white text-center leading-normal;
  top: 43%;
}

.page-info h1 {
  text-shadow: 0.1rem 0.1rem 0.2rem rgb(0 0 0 / 15%);
  @apply text-4xl font-bold leading-normal;
}
</style>