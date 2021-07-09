<template>
  <div class="article-timeline">
    <div class="timeline-title">{{ title }} - {{ subtitle }}</div>
    <div class="article-list">
      <div
        class="article-list-item"
        v-for="item in list"
        :key="item.id ?? item"
        :class="{ year: !item.id }"
      >
        <template v-if="item.id">
          <router-link class="article-cover" :to="`/${item.title}`">
            <img :src="item.cover" />
          </router-link>
          <div class="article-info">
            <div class="post-time">
              <i class="iconfont">&#xe72a;</i>
              {{ toDate(item.createdAt) }}
            </div>
            <router-link class="article-title" :to="`/${item.title}`">
              {{
                item.title
              }}
            </router-link>
          </div>
        </template>
        <template v-else>{{ yearAndMonthStr2ZH(item) }}</template>
      </div>
      <div class="no-data" v-if="!list.length">无文章</div>
    </div>
    <Pagination
      v-if="pagination"
      :current="pagination.current ?? page"
      :total="pagination.total ?? articles.length"
      :size="pagination.size ?? 10"
      @page-change="handlePageChange"
      @page-error="handlePageError"
    />
  </div>
</template>

<script setup>
import Pagination from "./Pagination.vue";
import { computed, defineEmit, defineProps, ref, toRefs } from "vue";
import { articles2Archives, yearAndMonthStr2ZH } from "@/utils/helper";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  articles: {
    type: Array,
    required: true,
  },
  pagination: {
    type: Object,
    default: false,
  },
});


const { articles, pagination } = toRefs(props);


const toDate = (time) => new Date(time).toLocaleDateString().replaceAll("/", "-");

const emit = defineEmit(['page-change', 'page-error']);

const page = ref(1);

const showArticles = computed(() => {
  if (pagination.value) {
    const { current = page.value, size = 10 } = pagination.value;
    return articles.value.slice((current - 1) * size, current * size);
  } else {
    return articles.value;
  }
});

const list = computed(() => [...articles2Archives(showArticles.value)].flat(2));

const handlePageError = (page) => emit("page-error", page);

const handlePageChange = (newPage) => {
  emit("page-change", newPage);
  if (!pagination.value.current) {
    page.value = newPage;
  }
};
</script>

<style lang="postcss" scoped>
.article-timeline {
  @apply px-4 py-7;
}
.article-timeline .timeline-title {
  margin-left: 9px;
  @apply text-2xl pl-5 pb-5 relative box-content leading-loose;
}

.article-timeline .timeline-title::before {
  content: "";
  border: 5px solid #49b1f5;
  top: 1rem;
  left: -0.5625rem;
  @apply absolute w-2.5 h-2.5 rounded-full box-content transition-all duration-200 ease-in-out;
}

.article-timeline .timeline-title::after {
  content: "";
  background: #aadafa;
  width: 3px;
  @apply absolute  h-8 left-0 bottom-0;
}

.article-timeline .timeline-title:hover::before {
  border-color: #ff7242;
}

.article-timeline .article-list {
  margin-left: 9px;
  border-color: #aadafa;
  @apply border-l-2 border-solid pl-5;
}

.article-timeline .article-list-item {
  margin-left: 10px;
  height: 80px;
  @apply flex items-center mb-5 relative;
}

.article-timeline .article-list-item .article-cover {
  width: 80px;
  height: 80px;
  @apply overflow-hidden;
}

.article-timeline .article-list-item img {
  @apply w-full h-full object-cover transition-all duration-200 ease-in-out;
}

.article-timeline .article-list-item img:hover {
  @apply transform-gpu scale-110;
}

.article-timeline .article-list-item .article-info {
  @apply px-4;
}

.article-timeline .article-info .post-time {
  @apply text-sm text-gray-400;
}

.article-timeline .article-info .article-title {
  @apply block transition-all duration-300 ease-in-out;
}

.article-timeline .article-info .article-title:hover {
  color: #49b1f5;
  @apply transform translate-x-3;
}

.article-timeline .article-list-item:hover::before {
  border-color: #ff7242;
}

.article-timeline .article-list-item::before {
  content: "";
  width: 6px;
  height: 6px;
  border: 3px solid #49b1f5;
  top: 34px;
  left: -37px;
  background-color: #fff;
  @apply absolute rounded-full box-content transition-all duration-200 ease-in-out;
}

.article-timeline .article-list-item.year {
  height: 40px;
  @apply text-xl;
}

.article-timeline .article-list-item.year:hover::before {
  border-color: #49b1f5;
}

.article-timeline .article-list-item.year::before {
  top: 14px;
  border-color: #ff7242;
}
</style>