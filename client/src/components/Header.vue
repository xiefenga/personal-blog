<template>
  <header>
    <nav-bar :site-name="siteName" />
    <site-title :title="siteTitle" :subtitle="siteSubtitle" />
    <div class="scroll-down"></div>
  </header>
</template>

<script>
import NavBar from "./NavBar.vue";
import SiteTitle from "./SiteTitle.vue";
export default {
  components: {
    NavBar,
    SiteTitle,
  },
  data: () => ({
    siteName: "哪有多奇怪",
    siteTitle: "哪有多奇怪",
    siteSubtitle: [
      "孩子不是有待铸造的物料，而是有待启发的人。",
      "Children are not things to be molded, \
      but are people to be unfolded",
    ],
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
</style>