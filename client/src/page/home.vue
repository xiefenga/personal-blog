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
import Main from "@/components/Main.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { CONSOLE_STR } from "@/utils/constants";
import { fetchSiteInfo } from "@/store/site";
import { fetchArchives } from "@/store/archives";

fetchSiteInfo();
fetchArchives();
</script>

