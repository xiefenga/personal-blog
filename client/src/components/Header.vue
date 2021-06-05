<template>
  <header>
    <nav-bar />
    <page-title />
    <scroll-down v-if="showScrollDown" />
  </header>
</template>

<script setup>
import NavBar from "./NavBar.vue";
import PageTitle from "./PageTitle.vue";
import ScrollDown from "./ScrollDown.vue";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const showScrollDown = computed(() =>
  ["home", "article-list"].includes(route.name)
);
</script>

<style lang="postcss" scoped>
header {
  background-color: #49b1f5;
  background-image: url("http://xiefeng.tech/custom_assets/img/index_top.jpg");
  height: 400px;
  @apply relative bg-fixed bg-cover bg-center bg-no-repeat;
}

header .scroll-down {
  @apply absolute bottom-0;
}
</style>