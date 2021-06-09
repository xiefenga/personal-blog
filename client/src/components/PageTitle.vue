<template>
  <div class="page-info">
    <h1 class="page-title">{{ title }}</h1>
    <daily-sentence v-if="isHome" />
    <article-meta v-else-if="isArticle" />
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { siteInfo } from "@/store/site";
import { article } from "@/store/article";
import ArticleMeta from "./ArticleMeta.vue";
import DailySentence from "./DailySentence.vue";

export default {
  components: {
    ArticleMeta,
    DailySentence,
  },
  setup() {
    const route = useRoute();
    const isHome = computed(() => route.meta.home);
    const isArticle = computed(() => route.meta.article);
    const title = computed(() => {
      if (route.meta.title) {
        return route.meta.title;
      } else if (isArticle.value) {
        return article.title.value;
      }
      return siteInfo.siteName.value;
    });
    return {
      title,
      isHome,
      isArticle,
    };
  },
};
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