<template>
  <article id="article-content" v-html="html" />
</template>

<script>
import { computed, watch } from "vue";
import { mdParser } from "@/utils/helper";
import { useRoute, useRouter } from "vue-router";
import { startLoading, doneLoading } from "@/utils/helper";
import { fetchArticle, article, allArticles } from "@/store/article";

export default {
  setup() {
    const route = useRoute();

    const router = useRouter();

    if (!allArticles.length) {
      watch(allArticles, async () => {
        const title = route.params.article;
        const article = allArticles.find((a) => a.title === title);
        if (!article) {
          router.replace("/404");
        } else {
          await fetchArticle(article.id);
        }
      });
    }

    const { content } = article;

    const html = computed(() => mdParser.render(content.value));

    return {
      html,
    };
  },
  async beforeRouteEnter(to) {
    // 不是直接跳转
    if (allArticles.length) {
      const title = to.params.article;
      const article = allArticles.find((a) => a.title === title);
      if (!article) {
        return { path: "/404", replace: true };
      }
      startLoading();
      await fetchArticle(article.id);
      doneLoading();
    }
  },
  async beforeRouteUpdate(to) {
    const title = to.params.article;
    const article = allArticles.find((a) => a.title === title);
    if (!article) {
      return { path: "/404", replace: true };
    }
    startLoading();
    await fetchArticle(article.id);
    doneLoading();
  },
};
</script>

<style lang="postcss" scoped>
#article-content {
  @apply leading-loose text-sm;
}
</style>

