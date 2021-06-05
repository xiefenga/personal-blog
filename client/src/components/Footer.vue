<template>
  <footer>
    <div class="copyright">©{{ copyrightYear }} By {{ author }}</div>
    <div class="ipc">
      <a :href="ICP_URL" target="_blank">{{ beian }}</a>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { ICP_URL, SITE_START_YEAR } from "@/utils/constants";
import { siteInfo, author as authorInfo } from "@/store/site";

const { beian } = siteInfo;
const { name: author } = authorInfo;
const curYear = new Date().getFullYear();

const copyrightYear = computed(() =>
  SITE_START_YEAR === curYear ? `${curYear}` : `${startYear} - ${curYear}`
);
</script>

<style lang="postcss" scoped>
footer {
  background: #49b1f5;
  background-image: url("http://xiefeng.tech/custom_assets/img/index_top.jpg");
  color: #eee;
  @apply px-5 py-12 leading-loose text-center bg-bottom bg-cover;
}

footer .ipc {
  @apply hover:underline;
}
</style>
