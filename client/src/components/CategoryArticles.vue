<template>
  <time-line
    title="分类"
    :subtitle="title"
    :articles="articles"
    :pagination="{ current: page }"
    @page-change="pageChange"
    @page-error="pageError"
  />
</template>

<script>
import TimeLine from "./TimeLine.vue";
import { categories } from "@/store/categories";
import { computed, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCategoryArticles } from "@/api/category";
import { usePagination } from "@/compositions/usePagination";
export default {
  components: {
    TimeLine,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const title = computed(() => {
      const { top, category } = route.params;
      return category || top;
    });
    const articles = ref([]);
    watchEffect(async () => {
      const { top, category } = route.params;
      if (categories.length && top) {
        if (category) {
          const topCInfo = categories.find((t) => t.name === top);
          if (!topCInfo) {
            router.replace("/404");
          } else {
            const categoryInfo = topCInfo.children.find(
              (c) => c.name === category
            );
            if (!categoryInfo) {
              router.replace("/404");
            } else {
              const { data } = await getCategoryArticles(categoryInfo.id);
              articles.value = data;
            }
          }
        } else {
          const topCInfo = categories.find((t) => t.name === top);
          if (!topCInfo) {
            router.replace("/404");
          } else {
            const { data } = await getCategoryArticles(topCInfo.id);
            articles.value = data;
          }
        }
      }
    });
    return {
      title,
      articles,
      ...usePagination("/categories"),
    };
  },
};
</script>