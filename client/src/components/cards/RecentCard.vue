<template>
  <card-widget headline class="recent-post-card">
    <template #headline>
      <i class="iconfont">&#xe64d;</i>
      <span>最新文章</span>
    </template>
    <div class="post-list">
      <div class="post-item" v-for="item in rencentPost">
        <router-link class="cover" :to="`/${item.title}`">
          <img :src="item.cover" />
        </router-link>
        <div class="info">
          <router-link class="title" :to="`/${item.title}`">
            {{
              item.title
            }}
          </router-link>
          <div class="post-time">{{ toDate(item.createdAt) }}</div>
        </div>
      </div>
    </div>
  </card-widget>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import CardWidget from "../CardWidget.vue";

const store = useStore();

const allArticles = computed(() => store.getters.allArticles);

const rencentPost = computed(() => allArticles.value.slice(0, 5));

const toDate = (time) => new Date(time).toLocaleDateString().replaceAll("/", "-");

</script>

<style lang="postcss" scoped>
.recent-post-card {
  @apply py-5 px-6;
}

.recent-post-card .headline .iconfont {
  font-size: inherit;
  vertical-align: -1px;
  @apply mr-1;
}

.recent-post-card .post-list .post-item {
  @apply flex items-center py-1;
}

.recent-post-card .post-list .post-item .cover {
  @apply w-14 h-14 flex-shrink-0 overflow-hidden cursor-pointer;
}

.recent-post-card .post-list .post-item .cover:hover img {
  @apply scale-110;
}

.recent-post-card .post-list .post-item .cover img {
  @apply w-full h-full object-cover transform-gpu transition duration-500;
}

.recent-post-card .post-list .post-item .info {
  @apply ml-2.5 text-sm leading-normal flex flex-col justify-between;
}

.recent-post-card .post-list .post-item .info .title {
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow-wrap: break-word;
  @apply overflow-hidden hover:text-blue-400 transition duration-200 ease-in-out cursor-pointer;
}

.recent-post-card .post-list .post-item .info .post-time {
  @apply text-xs text-gray-500;
}
</style>