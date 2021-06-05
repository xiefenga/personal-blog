<template>
  <card-widget class="article-content">
    <article v-html="content" />
  </card-widget>
</template>

<script setup>
import { computed, watchEffect } from "vue";
import CardWidget from "./CardWidget.vue";
import { useRoute } from "vue-router";
import { article, fetchArticle } from "@/store/article";
import { mdRender } from "@/utils/helper";
const route = useRoute();
const title = computed(() => route.params.article);
const content = computed(() => mdRender(article.content ?? ""));
watchEffect(async () => {
  await fetchArticle(title.value);
});
</script>

<style lang="postcss" scoped>
.article-content {
  @apply py-8 px-8 leading-loose text-sm;
}
</style>

