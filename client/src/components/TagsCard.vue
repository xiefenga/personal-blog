<template>
  <card-widget class="tags-card">
    <template #headline>
      <i class="iconfont">&#xe606;</i>
      <span>标签</span>
    </template>
    <router-link
      class="tag-item"
      v-for="tag in tags"
      :key="tag.id"
      :style="{
        fontSize: randomSize(tag.id),
        color: randomColor(tag.id),
      }"
      :to="`/tags/${encode(tag.name)}`"
    >
      {{ tag.name }}
    </router-link>
  </card-widget>
</template>

<script setup>
import CardWidget from "./CardWidget.vue";
import { tags, fetchTags } from "@/store/tags";
fetchTags();
const sizes = [
  "1rem",
  "1.25rem",
  "1.2rem",
  "1.1rem",
  "1.05rem",
  "1.125rem",
  "1.025rem",
];
const randomSize = (id) => sizes[id % 7];

const colors = [
  "#52a08",
  "#9cb23e",
  "#c3c23d",
  "#6681be",
  "#742f",
  "#467119",
  "#7b8935",
  "#1beeba",
  "#fc6582",
  "#96816e",
  "#d2e40c",
  "#104854",
  "#e77c8f",
  "#a21dc0",
  "#df7002",
  "#7837f3",
];

const randomColor = (id) => colors[id % 16];

const encode = (url) => {
  if (url.includes("/")) {
    return url.replace("/", "%2F");
  } else {
    return encodeURI(url);
  }
};
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