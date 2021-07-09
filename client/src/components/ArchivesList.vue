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

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import TimeLine from "./TimeLine.vue";
import { usePagination } from "@/compositions/usePagination";

const store = useStore();

const articlesMap = computed(() => store.state.articlesMap);

const allArticles = computed(() => store.getters.allArticles);

const count = computed(() => articlesMap.value.size.toString());

const { page, pageChange, pageError } = usePagination('/archives');

</script>

