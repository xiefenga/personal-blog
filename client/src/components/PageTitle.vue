<template>
  <div class="page-info">
    <h1 class="page-title">{{ title }}</h1>
    <daily-sentence v-if="isHome" />
    <article-meta v-else-if="isArticle" />
  </div>
</template>

<script setup>
import { siteInfo } from "@/store/site";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import ArticleMeta from "./ArticleMeta.vue";
import DailySentence from "./DailySentence.vue";
import { article } from "@/store/article";
const route = useRoute();
const isHome = computed(() => route.meta.home);
const isArticle = computed(() => route.meta.article);
const title = computed(() => {
  if (isHome.value) {
    return siteInfo.siteName.value;
  } else if (isArticle.value) {
    return article.title.value;
  } else if (route.name === "about-me") {
    return "关于我";
  }
  return siteInfo.siteName.value;
});
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