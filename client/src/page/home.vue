<template>
  <Header />
  <Main>
    <!-- 使用了 keep-alive 组件之后，组件不会被销毁，route 的变化依旧会导致 组件中的 watchEffect 等重新运行 -->
    <!-- <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view> -->
    <router-view></router-view>
  </Main>
  <Footer />
</template>

<script>
import { onMounted } from "vue";
import Main from "@/layout/Main.vue";
import Header from "@/layout/Header.vue";
import Footer from "@/layout/Footer.vue";
import { fetchTags } from "@/store/tags";
import { fetchQuote } from "@/store/quote";
import { fetchSiteInfo } from "@/store/site";
import { fetchArticles } from "@/store/article";
import { CONSOLE_STR } from "@/utils/constants";
import { fetchCategories } from "@/store/categories";

export default {
  components: {
    Main,
    Header,
    Footer,
  },
  setup() {
    fetchSiteInfo();
    fetchArticles();
    fetchCategories();
    fetchQuote();
    fetchTags();
    onMounted(() => console.log(CONSOLE_STR));
  },
};
</script>

