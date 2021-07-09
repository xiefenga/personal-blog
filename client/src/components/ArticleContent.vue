<template>
  <article id="article-content" v-html="html" />
</template>

<script>
import store from "@/store";
import { useStore } from "vuex";
import { computed, watch } from "vue";
import { mdParser } from "@/utils/helper";
import { FETCH_ARTICLE } from "@/store/actions";
import { useRoute, useRouter } from "vue-router";
import { startLoading, doneLoading } from "@/utils/helper";

export default {
  setup() {
    const route = useRoute();

    const router = useRouter();

    const store = useStore();

    const map = store.state.articlesMap;

    if (!map.length) {
      watch(() => store.state.articlesMap, async () => {
        const title = route.params.article;
        const success = await store.dispatch(FETCH_ARTICLE, title);
        if (!success) {
          router.replace("/404");
        }
      });
    }

    const html = computed(() => mdParser.render(store.state.article.content));

    return {
      html,
    };
  },
  async beforeRouteEnter(to) {
    const map = store.state.articlesMap;
    // 不是直接进入该页面需要先加载
    if (map.size) {
      const title = to.params.article;
      startLoading();
      const success = await store.dispatch(FETCH_ARTICLE, title);
      doneLoading();
      if (!success) {
        return { path: "/404", replace: true };
      }
    }
  },
  async beforeRouteUpdate(to) {
    const title = to.params.article;
    startLoading();
    const success = await store.dispatch(FETCH_ARTICLE, title);
    doneLoading();
    if (!success) {
      return { path: "/404", replace: true };
    }
  },
};
</script>

<style lang="postcss" scoped>
#article-content {
  @apply leading-loose text-sm;
}
</style>

