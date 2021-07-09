<template>
  <card-widget class="admin-card">
    <div class="admin-avatar">
      <img class="avatar" :src="siteInfo.avatar" />
    </div>
    <div class="admin-name">{{ siteInfo.author }}</div>
    <div class="blog-data">
      <div class="blog-data-item">
        <div class="headline">文章</div>
        <div class="item-data">{{ articles }}</div>
      </div>
      <div class="blog-data-item">
        <div class="headline">标签</div>
        <div class="item-data">{{ tags }}</div>
      </div>
      <div class="blog-data-item">
        <div class="headline">分类</div>
        <div class="item-data">{{ categories }}</div>
      </div>
    </div>
    <div class="social-icons">
      <!-- github -->
      <a class="social-item" :href="siteInfo.github" target="_blank">
        <i class="iconfont">&#xe811;</i>
      </a>
      <!-- mail -->
      <a class="social-item" :href="`mailto:${siteInfo.mail}`" target="_blank">
        <i class="iconfont">&#xe7b7;</i>
      </a>
      <!-- blog -->
      <a class="social-item" href="https://juejin.cn/user/2990289124862462">
        <i class="iconfont">&#xe603;</i>
      </a>
    </div>
  </card-widget>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import CardWidget from "../CardWidget.vue";
import { FETCH_SITE_INFO } from "@/store/actions";

const store = useStore();

store.dispatch(FETCH_SITE_INFO);

const articles = computed(() => store.state.articlesMap.size);

const siteInfo = computed(() => store.state.siteInfo);

const tags = computed(() => store.state.tags.length);

const categories = computed(() =>
  store.state.categories.reduce((count, c) => count + c.children.length + 1, 0)
);
</script>

<style lang="postcss" scoped>
.admin-card {
  @apply py-5 px-6 text-center;
}

.admin-card .admin-avatar:hover .avatar {
  transform: rotate(360deg);
}

.admin-card .admin-avatar .avatar {
  border-radius: 70px;
  @apply w-28 h-28 m-auto transition duration-500 ease-in-out;
}

.admin-card .admin-name {
  @apply font-medium text-xl leading-loose my-2;
}

.admin-card .blog-data {
  @apply flex mt-3 mb-1;
}

.admin-card .blog-data .blog-data-item {
  @apply flex-1 cursor-pointer;
}

.admin-card .blog-data .blog-data-item .item-data {
  @apply text-xl leading-8;
}

.admin-card .social-icons {
  @apply flex justify-around mt-2;
}

.admin-card .social-icons .social-item {
  @apply text-2xl cursor-pointer transition duration-500 ease-in-out;
}

.admin-card .social-icons .social-item:hover {
  transform: rotate(540deg);
}

.admin-card .social-icons .iconfont {
  font-size: inherit;
}
</style>

