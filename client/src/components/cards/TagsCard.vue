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
      :style="tag.style"
      :to="`/tags/${tag.name}`"
    >
      {{ tag.name }}
    </router-link>
  </card-widget>
</template>

<script >
import CardWidget from "../CardWidget.vue";
import { useTagCloud } from "@/compositions/useTagCloud";
export default {
  components: {
    CardWidget,
  },
  setup() {
    return {
      tags: useTagCloud(),
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