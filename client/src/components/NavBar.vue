<template>
  <nav>
    <span class="site-name">
      <router-link to="/">{{ siteInfo.siteName }}</router-link>
    </span>
    <div class="nav-menus">
      <router-link class="menus-item archive-btn" to="/archives">
        <i class="iconfont">&#xe6b0;</i>
        <span>归档</span>
      </router-link>
      <router-link class="menus-item category-btn" to="/categories">
        <i class="iconfont text-xl">&#xe6ea;</i>
        <span>分类</span>
      </router-link>
      <router-link class="menus-item tag-btn" to="/tags">
        <i class="iconfont">&#xe606;</i>
        <span>标签</span>
      </router-link>
      <router-link class="menus-item about-btn" to="/about">
        <i class="iconfont text-lg">&#xe65c;</i>
        <span>关于</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const siteInfo = computed(() => store.state.siteInfo);
</script>


<style lang="postcss" scoped>
nav {
  height: 60px;
  @apply flex items-center px-12 text-lg absolute w-full inset-0;
}

nav .site-name {
  text-shadow: 0.1rem 0.1rem 0.2rem rgb(0 0 0 / 15%);
  @apply text-gray-100 font-bold hover:text-white transition duration-200;
}

nav .nav-menus {
  @apply ml-auto text-sm;
}

nav .nav-menus .menus-item {
  text-shadow: 0.05rem 0.05rem 0.1rem rgb(0 0 0 / 30%);
  @apply relative text-gray-100 hover:text-white leading-loose pb-1.5 ml-3.5 transition duration-200;
}

nav .nav-menus .menus-item::after {
  @apply absolute left-0 bottom-0 w-0 transition-all duration-300;
  content: "";
  height: 3px;
  background-color: #80c8f8;
}

nav .nav-menus .menus-item:hover:after {
  @apply w-full;
}

/* 对每个 icon 进行微调 */

.archive-btn .iconfont {
  @apply text-2xl;
  vertical-align: -3px;
}

.category-btn .iconfont {
  @apply text-2xl;
  vertical-align: -4px;
}

.tag-btn .iconfont {
  margin-right: 5px;
}

.about-btn .iconfont {
  margin-right: 2px;
  vertical-align: -1px;
}
</style>