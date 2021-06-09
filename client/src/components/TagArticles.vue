<template>
  <time-line
    title="标签"
    :subtitle="tag"
    :articles="articles"
    :pagination="{ current: page }"
    @page-change="pageChange"
    @page-error="pageError"
  />
</template>

<script>
import { tags } from "@/store/tags";
import { ref, watchEffect } from "vue";
import TimeLine from "./TimeLine.vue";
import { getTagArticles } from "@/api/tag";
import { useRoute, useRouter } from "vue-router";
import { usePagination } from "@/compositions/usePagination";

export default {
  components: {
    TimeLine,
  },
  setup() {
    const route = useRoute();

    const router = useRouter();

    const tag = route.params.tag;

    const articles = ref([]);

    watchEffect(async () => {
      const tagInfo = tags.find((t) => t.name === tag);
      if (tags.length && !tagInfo) {
        router.replace("/404");
      } else if (tagInfo) {
        const { data } = await getTagArticles(tagInfo.id);
        articles.value = data;
      }
    });

    return {
      tag,
      articles,
      ...usePagination("/tags"),
    };
  },
};
</script>