<template>
  <card-widget headline class="tags-card">
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
      :to="`/tags/${tag.name}`"
    >
      {{ tag.name }}
    </router-link>
  </card-widget>
</template>

<script >
import { tags } from "@/store/tags";
import CardWidget from "../CardWidget.vue";
export default {
  components: {
    CardWidget,
  },
  setup() {
    const sizes = [
      "1rem",
      "1.25rem",
      "1.2rem",
      "1.1rem",
      "1.05rem",
      "1.125rem",
      "1.025rem",
    ];

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
    const randomSize = (id) => sizes[id % 7];
    const randomColor = (id) => colors[id % 16];
    return {
      tags,
      randomColor,
      randomSize,
    };
  },
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
  @apply text-xl mx-1 inline-block leading-loose transition duration-200 ease-in-out;
}

.tags-card .tag-item:hover {
  color: rgb(96, 165, 250) !important;
}
</style>