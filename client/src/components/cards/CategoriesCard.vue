<template>
  <card-widget headline class="categories-card">
    <template #headline>
      <i class="iconfont">&#xe6ea;</i>
      <span>分类</span>
    </template>
    <tree-list :data="categories" v-slot="{ item }">
      <div class="category-item">
        <span class="date">{{ item.name }}</span>
        <!-- <span class="count">{{ item.count }}</span> -->
      </div>
    </tree-list>
  </card-widget>
</template>

<script >
import TreeList from "../TreeList.vue";
import CardWidget from "../CardWidget.vue";
import { categories } from "@/store/categories";
export default {
  components: {
    TreeList,
    CardWidget,
  },
  data: () => ({
    categories,
  }),
};
</script>

<style lang="postcss" scoped>
.categories-card .iconfont {
  @apply text-2xl align-bottom mr-0.5;
}

.categories-card .category-item {
  @apply px-2;
}
</style>