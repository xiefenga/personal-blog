<template>
  <header :class="{ 'article-bg': isArticle }" :style="{ backgroundImage: `url(${bg}` }">
    <nav-bar />
    <page-title />
    <scroll-down v-if="isHome" />
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import PageTitle from "@/components/PageTitle.vue";
import ScrollDown from "@/components/ScrollDown.vue";

const store = useStore();

const route = useRoute();

const isHome = computed(() => route.meta.home);

const isArticle = computed(() => route.meta.article);

const bg = computed(() => {
  if (isHome.value) {
    return "http://xiefeng.tech/custom_assets/img/index_top.jpg";
  } else if (isArticle.value) {
    return store.state.article.cover;
  }
  return "http://xiefeng.tech/custom_assets/img/index_top.jpg";
});

</script>

<style lang="postcss" scoped>
header {
  background-color: #49b1f5;
  background-image: url("http://xiefeng.tech/custom_assets/img/index_top.jpg");
  height: 400px;
  @apply relative bg-local bg-cover bg-center bg-no-repeat;
}

header.article-bg:before {
  background-color: rgba(0, 0, 0, 0.5);
  content: "";
  @apply absolute w-full h-full inset-0;
}

header.article-bg >>> h1 {
  font-weight: 400;
}

header .scroll-down {
  @apply absolute bottom-0;
}
</style>