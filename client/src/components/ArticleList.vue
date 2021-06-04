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

<script setup>
import { useRouter, useRoute } from "vue-router";
import { computed, ref, watchEffect } from "vue";
import { getArticleList } from "@/api/article";
import ArticleCard from "@/components/ArticleCard.vue";
import Pagination from "@/components/Pagination.vue";
import { PAGINATION_PAGE_SIZE } from "@/utils/constants";

import "nprogress/nprogress.css";
import NProgress from "nprogress";

const articles = ref([]);

const count = ref(0);

const router = useRouter();
const route = useRoute();

const page = computed(() => Number(route.params.page) || 1);

watchEffect(async () => {
  NProgress.start();
  const { data, count: total } = await getArticleList(
    page.value,
    PAGINATION_PAGE_SIZE
  );
  NProgress.done();
  articles.value = data;
  count.value = total;
});

const pageChange = (newPage) => router.push("/" + newPage);
</script>

<style lang="postcss" scoped>
.article-list .pagination {
  margin-top: 20px;
}
</style>