<template>
  <Header />
  <main>
    <article-list class="left-content" />
    <aside-content class="right-content" />
  </main>
  <Footer />
</template>

<script setup>
import Header from "@/components/Header.vue";
import ArticleList from "@/components/ArticleList.vue";
import AsideContent from "@/components/AsideContent.vue";
import Footer from "@/components/Footer.vue";
</script>

<style lang="postcss" scoped>
main {
  margin: 0 auto;
  padding: 2rem 15px;
  max-width: 1200px;
  display: flex;
}

main .left-content {
  width: 75%;
}

main .right-content {
  width: 25%;
  padding-left: 15px;
  box-sizing: content-box;
}
</style>