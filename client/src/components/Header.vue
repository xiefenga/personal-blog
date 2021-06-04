<template>
  <header>
    <nav-bar :site-name="siteName" />
    <page-title :title="title" />
    <scroll-down />
  </header>
</template>

<script>
import NavBar from "./NavBar.vue";
import PageTitle from "./PageTitle.vue";
import ScrollDown from "./ScrollDown.vue";
export default {
  components: {
    NavBar,
    PageTitle,
    ScrollDown,
  },
  data: () => ({
    siteName: "哪有多奇怪",
    title: "哪有多奇怪",
  }),
};
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