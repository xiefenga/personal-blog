<template>
  <card-widget class="recent-post-card">
    <template #headline>
      <i class="iconfont">&#xe64d;</i>
      <span>最新文章</span>
    </template>
    <div class="post-list">
      <div class="post-item">
        <div class="cover">
          <img src="http://oss.xiefeng.tech/img/20210411094558.png" />
        </div>
        <div class="info">
          <router-link class="title" to="/">react-router核心原理</router-link>
          <div class="post-time">2021-04-11</div>
        </div>
      </div>
    </div>
  </card-widget>
</template>

<script setup>
import CardWidget from "./CardWidget.vue";
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
  @apply flex items-center;
}

.recent-post-card .post-list .post-item .cover {
  @apply w-14 h-14 flex-shrink-0 overflow-hidden;
}

.recent-post-card .post-list .post-item .cover:hover img {
  @apply scale-110;
}

.recent-post-card .post-list .post-item .cover img {
  @apply w-full h-full object-cover transform-gpu transition duration-500;
}

.recent-post-card .post-list .post-item .info {
  @apply ml-2.5 text-sm leading-normal;
}

.recent-post-card .post-list .post-item .info .title {
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow-wrap: break-word;
  @apply overflow-hidden hover:text-blue-400 transition duration-200 ease-in-out;
}

.recent-post-card .post-list .post-item .info .post-time {
  @apply text-xs text-gray-500;
}
</style>