<template>
  <Header />
  <Main>
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </Main>
  <Footer />
</template>

<script setup>
import { onMounted, watch, ref } from "vue";
import Main from "@/layout/Main.vue";
import Header from "@/layout/Header.vue";
import Footer from "@/layout/Footer.vue";
import { CONSOLE_STR } from "@/utils/constants";
import { fetchSiteInfo } from "@/store/site";
import { fetchArticles } from "@/store/article";
import { fetchCategories } from "@/store/categories";
import { fetchQuote } from "@/store/quote";
import { fetchTags } from "@/store/tags";

fetchSiteInfo();
fetchArticles();
fetchCategories();
fetchQuote();
fetchTags();
</script>

