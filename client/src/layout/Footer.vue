<template>
  <footer>
    <div class="copyright">©{{ copyrightYear }} By {{ siteInfo.author }}</div>
    <div class="ipc">
      <a :href="ICP_URL" target="_blank">{{ siteInfo.beian }}</a>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { ICP_URL, SITE_START_YEAR } from "@/utils/constants";

const store = useStore();

const siteInfo = computed(() => store.state.siteInfo);

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
