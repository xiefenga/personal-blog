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

<script setup>
import { useStore } from "vuex";
import TimeLine from "./TimeLine.vue";
import { getTagArticles } from "@/api/tag";
import { computed, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePagination } from "@/compositions/usePagination";

const store = useStore();

const route = useRoute();

const router = useRouter();

const tag = route.params.tag;

const tags = computed(() => store.state.tags);

const articles = ref([]);

const { page, pageChange, pageError } = usePagination("/tags");

watchEffect(async () => {
  const tagInfo = tags.value.find((t) => t.name === tag);
  if (tags.value.length && !tagInfo) {
    router.replace("/404");
  } else if (tagInfo) {
    const { data } = await getTagArticles(tagInfo.id);
    articles.value = data;
  }
});
</script>