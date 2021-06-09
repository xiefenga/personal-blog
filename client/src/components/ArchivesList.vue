<template>
  <time-line
    title="文章总览"
    :subtitle="count"
    :articles="allArticles"
    :pagination="{ current: page, size: 10 }"
    @page-change="pageChange"
    @page-error="pageError"
  />
</template>

<script>
import { computed } from "vue";
import TimeLine from "./TimeLine.vue";
import { allArticles } from "@/store/article";
import { usePagination } from "@/compositions/usePagination";

export default {
  components: {
    TimeLine,
  },
  setup() {
    const count = computed(() => allArticles.length);
    return {
      count,
      allArticles,
      ...usePagination("/archives"),
    };
  },
};
</script>

