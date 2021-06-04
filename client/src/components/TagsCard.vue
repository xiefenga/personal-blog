<template>
  <card-widget class="tags-card">
    <template #headline>
      <i class="iconfont">&#xe606;</i>
      <span>标签</span>
    </template>
    <router-link class="tag-item" v-for="tag in tags" :key="tag.id" to="/">
      {{ tag.name }}
    </router-link>
  </card-widget>
</template>

<script setup>
import CardWidget from "./CardWidget.vue";
import { ref } from "vue";

const tags = ref([
  { id: 1, name: "网络" },
  { id: 2, name: "http/https" },
  { id: 3, name: "数据结构" },
  { id: 4, name: "JavaScript" },
  { id: 5, name: "React" },
  { id: 6, name: "Typescript" },
  { id: 7, name: "Vue" },
  { id: 8, name: "CSS" },
  { id: 9, name: "hexo" },
  { id: 10, name: "mongodb" },
  { id: 11, name: "webpack" },
  { id: 12, name: "NodeJs" },
  { id: 12, name: "计算机基础" },
]);
</script>

<style lang="postcss" scoped>
.tags-card {
  @apply py-5 px-6;
}

.tags-card .headline .iconfont {
  font-size: inherit;
  @apply mr-1;
}

.tags-card .tag-item {
  @apply text-xl mx-1 inline-block leading-loose hover:text-blue-400 transition duration-200 ease-in-out;
}
</style>