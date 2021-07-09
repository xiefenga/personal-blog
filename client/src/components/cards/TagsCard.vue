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
    >{{ tag.name }}</router-link>
  </card-widget>
</template>

<script setup>
import { useStore } from "vuex";
import CardWidget from "../CardWidget.vue";
import { FETCH_TAGS } from "@/store/actions";
import { useTagCloud } from "@/compositions/useTagCloud";

const tags = useTagCloud();

const store = useStore();

store.dispatch(FETCH_TAGS);

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