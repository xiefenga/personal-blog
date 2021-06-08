<template>
  <div class="article-list">
    <article-card
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
    <Pagination :current="page" :total="count" @page-change="pageChange" />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import Pagination from "./Pagination.vue";
import { getArticleList } from "@/api/article";
import { useRouter, useRoute } from "vue-router";
import ArticleCard from "./cards/ArticleCard.vue";
import { PAGINATION_PAGE_SIZE } from "@/utils/constants";
import { startLoading, doneLoading } from "@/utils/helper";

export default {
  components: {
    Pagination,
    ArticleCard,
  },
  setup() {
    const count = ref(0);
    const articles = ref([]);

    const route = useRoute();
    const router = useRouter();

    const page = computed(() => Number(route.params.page ?? 1));

    const pageChange = (page) =>
      router.push(page === 1 ? "/" : `/page/${page}`);

    return {
      count,
      page,
      articles,
      pageChange,
    };
  },
  beforeRouteEnter(to, from, next) {
    const { page = 1 } = to.params;
    // 不是直接跳转
    if (from.matched.length) {
      startLoading();
    }
    getArticleList(page, PAGINATION_PAGE_SIZE).then(({ data, count }) => {
      doneLoading();
      if (data.length === 0) {
        next("/404");
      }
      next((vm) => {
        vm.articles = data;
        vm.count = count;
      });
    });
  },
  async beforeRouteUpdate(to) {
    const { page = 1 } = to.params;
    // 不是直接跳转
    startLoading();
    const { data, count } = await getArticleList(page, PAGINATION_PAGE_SIZE);
    doneLoading();
    if (data.length === 0) {
      return { path: "/404", replace: true };
    }
    this.articles = data;
    this.count = count;
  },
};
</script>

<style lang="postcss" scoped>
.article-list .pagination {
  margin-top: 20px;
}
</style>