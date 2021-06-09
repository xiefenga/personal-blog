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
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    TimeLine,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const count = computed(() => allArticles.length);
    const page = computed(() => Number(route.params.page ?? 1));
    const pageChange = (page) => {
      router.push(page === 1 ? "/archives" : "/archives/page/" + page);
    };
    const pageError = () => router.replace("/404");
    return {
      page,
      count,
      allArticles,
      pageChange,
      pageError,
    };
  },
};
</script>

