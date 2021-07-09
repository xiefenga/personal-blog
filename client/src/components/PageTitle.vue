<template>
  <div class="page-info">
    <h1 class="page-title">{{ title }}</h1>
    <daily-sentence v-if="isHome" />
    <article-meta v-else-if="isArticle" />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, watchEffect } from "vue";
import ArticleMeta from "./ArticleMeta.vue";
import DailySentence from "./DailySentence.vue";

const store = useStore();

const route = useRoute();

const isHome = computed(() => route.meta.home);
const isArticle = computed(() => route.meta.article);

const siteName = computed(() => store.state.siteInfo.siteName);

const title = computed(() => {
  const { title, tag, category } = route.meta;
  if (title) {
    return title;
  } else if (isArticle.value) {
    return store.state.article.title;
  } else if (tag) {
    return route.params.tag;
  } else if (category) {
    const { top, category } = route.params;
    return category || top;
  }
  return siteName.value;
});

watchEffect(() => document.title = isHome.value ? title.value : `${title.value} | ${siteName.value}`);
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