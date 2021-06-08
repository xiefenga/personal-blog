<template>
  <card-widget class="article-card">
    <router-link class="article-cover" :to="`/${article.title}`">
      <img :src="article.cover" />
    </router-link>
    <div class="article-info">
      <router-link class="article-title" :to="`/${article.title}`">
        {{ article.title }}
      </router-link>
      <div class="article-metas">
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
              <span class="category">{{ cs[1].name }}</span>
            </template>
            <template v-if="index !== categories.length - 1">
              <span class="item-separator">•</span>
            </template>
          </template>
        </span>
        <span class="meta-separator">|</span>
        <span class="meta-item">
          <i class="iconfont">&#xe606;</i>
          <template v-for="(t, index) in tags" :key="t.id">
            <span class="tag">{{ t.name }}</span>
            <template v-if="index !== tags.length - 1">
              <span class="item-separator">•</span>
            </template>
          </template>
        </span>
      </div>
      <div class="article-preview">{{ preview }}</div>
    </div>
  </card-widget>
</template>

<script>
import { computed } from "vue";
import toText from "markdown2text";
import CardWidget from "../CardWidget.vue";
import { relativeTime2ZHStr } from "@/utils/helper";

export default {
  components: {
    CardWidget,
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { article } = props;

    const preview = computed(() => toText(article.content || "").slice(0, 500));

    const hasPosted = computed(() => relativeTime2ZHStr(article.createdAt));

    const hasUpdated = computed(() => relativeTime2ZHStr(article.updatedAt));

    const categories = computed(() => article.categories || []);

    const tags = computed(() => article.tags || []);
    return {
      preview,
      hasPosted,
      hasUpdated,
      categories,
      tags,
    };
  },
};
</script>

<style lang="postcss" scoped>
.article-card {
  @apply flex p-0;
  height: 280px;
}

.article-card:nth-of-type(even) {
  @apply flex-row-reverse;
}

.article-card .article-cover {
  width: 45%;
  @apply flex-shrink-0 cursor-pointer overflow-hidden;
}

.article-card .article-cover img {
  @apply object-cover h-full w-full 
  transition-transform duration-500;
}

.article-card:hover .article-cover img {
  @apply transform  scale-110;
}

.article-card .article-info {
  padding: 0 40px;
  @apply flex-grow flex flex-col justify-center;
}

.article-card .article-info .article-title {
  @apply block  w-full 
  text-2xl text-left hover:text-blue-400 
  transition duration-200 ease-in-out
  mb-1.5;
}

.article-card .article-info .article-metas {
  font-size: 13px;
  @apply text-gray-400;
}

.article-info .article-metas .iconfont {
  font-size: inherit;
  @apply mr-1;
}

.article-info .article-metas .category-level {
  @apply m-0 text-xs;
}

.article-info .article-metas .category,
.article-info .article-metas .tag {
  @apply hover:text-blue-400 cursor-pointer hover:underline;
}

.article-info .article-metas [class$="separator"] {
  @apply m-1.5;
}

.article-card .article-info .article-preview {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  @apply text-sm mt-2 overflow-hidden leading-loose;
}
</style>