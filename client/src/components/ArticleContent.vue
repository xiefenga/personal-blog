<template>
  <content-card class="article-content">
    <article v-html="content" />
  </content-card>
</template>

<script setup>
import { computed, watchEffect } from "vue";
import ContentCard from "./ContentCard.vue";
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
  @apply leading-loose text-sm;
}
</style>

