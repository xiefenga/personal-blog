<template>
  <card-widget class="admin-card">
    <div class="admin-avatar">
      <img class="avatar" :src="avatar" />
    </div>
    <div class="admin-name">{{ author }}</div>
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
      <a class="social-item" :href="github" target="_blank">
        <i class="iconfont">&#xe811;</i>
      </a>
      <!-- mail -->
      <a class="social-item" :href="`mailto:${mail}`" target="_blank">
        <i class="iconfont">&#xe7b7;</i>
      </a>
      <!-- blog -->
      <a class="social-item" href="https://juejin.cn/user/2990289124862462">
        <i class="iconfont">&#xe603;</i>
      </a>
    </div>
  </card-widget>
</template>

<script>
import { computed } from "vue";
import { siteInfo } from "@/store/site";
import CardWidget from "../CardWidget.vue";
import { tags as allTags } from "@/store/tags";
import { count as articles } from "@/store/article";
import { categories as allCategories } from "@/store/categories";

export default {
  components: {
    CardWidget,
  },
  setup() {
    const { github, mail, author, avatar } = siteInfo;
    const tags = computed(() => allTags.length);
    const categories = computed(() => allCategories.length);
    return {
      github,
      mail,
      author,
      avatar,
      tags,
      categories,
      articles,
    };
  },
};
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

