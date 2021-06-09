<template>
  <div class="article-meta">
    <div class="meta-firstline">
      <span class="meta-item">
        <i class="iconfont">&#xe72a;</i>
        <span>发表于 {{ hasPosted }}</span>
      </span>
      <span class="meta-separator">|</span>
      <span class="meta-item">
        <i class="iconfont">&#xe64d;</i>
        <span>更新于 {{ hasUpdated }}</span>
      </span>
      <span class="meta-separator">|</span>
      <span class="meta-item">
        <i class="iconfont">&#xe6bb;</i>
        <template v-for="(cs, index) in categories" :key="cs[0].id">
          <span class="category">{{ cs[0].name }}</span>
          <template v-if="cs[1]">
            <i class="iconfont category-level">&#xe72b;</i>
            <i class="iconfont">&#xe6bb;</i>
            <span class="category">{{ cs[1].name }}</span>
          </template>
          <template v-if="index !== categories.length - 1">
            <span class="item-separator">•</span>
          </template>
        </template>
      </span>
    </div>
    <div class="meta-secondline">
      <span class="meta-item">
        <i class="iconfont">&#xe742;</i>
        <span>字数总计：{{ showWords }}k</span>
      </span>
      <span class="meta-separator">|</span>
      <span class="meta-item">
        <i class="iconfont">&#xe61a;</i>
        <span>阅读时长：{{ cost }}分钟</span>
      </span>
      <span class="meta-separator">|</span>
      <span class="meta-item">
        <i class="iconfont">&#xe60c;</i>
        <span>阅读量：{{ views }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { article } from "@/store/article";
import { relativeTime2ZHStr } from "@/utils/helper";

export default {
  setup() {
    const { createdAt, updatedAt, categories, words, views } = article;

    const hasPosted = computed(() => relativeTime2ZHStr(createdAt.value));

    const hasUpdated = computed(() => relativeTime2ZHStr(updatedAt.value));

    const showWords = computed(() => (words.value / 1000).toFixed(1));

    const cost = computed(() => Math.ceil(words.value / 260));
    return {
      hasPosted,
      hasUpdated,
      showWords,
      cost,
    };
  },
};
</script>

<style lang="postcss" scoped>
.article-meta {
  @apply text-sm flex flex-col justify-between h-12 mt-2;
}

.article-meta .meta-secondline .iconfont {
  @apply text-xs;
}

.article-meta .iconfont {
  font-size: inherit;
  @apply mr-1;
}

.article-meta .category-level {
  @apply m-1 text-xs;
}

.article-meta .category {
  @apply hover:text-blue-400 cursor-pointer hover:underline;
}

.article-meta [class$="separator"] {
  @apply m-1.5;
}
</style>