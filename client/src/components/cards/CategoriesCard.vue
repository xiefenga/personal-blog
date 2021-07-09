<template>
  <card-widget headline class="categories-card">
    <template #headline>
      <i class="iconfont">&#xe6ea;</i>
      <span>分类</span>
    </template>
    <tree-list :data="categories" v-slot="{ item }">
      <div class="category-item" @click="handleClick(item)">
        <span class="date">{{ item.name }}</span>
        <!-- <span class="count">{{ item.count }}</span> -->
      </div>
    </tree-list>
  </card-widget>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import TreeList from "../TreeList.vue";
import CardWidget from "../CardWidget.vue";
import { FETCH_CATEGORIES } from "@/store/actions";

const store = useStore();

store.dispatch(FETCH_CATEGORIES);

const categories = computed(() => store.state.categories);

const router = useRouter();

const handleClick = (category) => {
  if (category.parentId) {
    const top = categories.value.find((t) => t.id === category.parentId);
    router.push(`/categories/${top.name}/${category.name}`);
  } else {
    router.push(`/categories/${category.name}`);
  }
}
</script>

<style lang="postcss" scoped>
.categories-card .iconfont {
  @apply text-2xl align-bottom mr-0.5;
}

.categories-card .category-item {
  @apply px-2;
}
</style>