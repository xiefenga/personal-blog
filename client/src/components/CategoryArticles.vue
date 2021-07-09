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

<script setup>
import { useStore } from "vuex";
import TimeLine from "./TimeLine.vue";
import { computed, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCategoryArticles } from "@/api/category";
import { usePagination } from "@/compositions/usePagination";

const store = useStore();

const route = useRoute();

const router = useRouter();

const title = computed(() => {
  const { top, category } = route.params;
  return category || top;
});

const articles = ref([]);

const categories = computed(() => store.state.categories);

watchEffect(async () => {
  const { top, category } = route.params;

  if (categories.value.length && top) {
    if (category) {
      const topCInfo = categories.value.find((t) => t.name === top);
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
      const topCInfo = categories.value.find((t) => t.name === top);
      if (!topCInfo) {
        router.replace("/404");
      } else {
        const { data } = await getCategoryArticles(topCInfo.id);
        articles.value = data;
      }
    }
  }
});

const { page, pageChange, pageError } = usePagination("/tags");

</script>