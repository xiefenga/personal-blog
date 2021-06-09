<template>
  <div class="categories-wrapper">
    <div class="title">分类 - {{ count }}</div>
    <div class="category-list-wrapper">
      <ul class="category-list">
        <li class="list-item" v-for="c1 in categories" :key="c1.id">
          <router-link :to="`/categories/${c1.name}`">{{
            c1.name
          }}</router-link>
          <ul class="category-list" v-if="c1.children">
            <li class="list-item" v-for="c2 in c1.children" :key="c2.id">
              <router-link :to="`/categories/${c1.name}/${c2.name}`">{{
                c2.name
              }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { computed } from "vue";
import { categories } from "@/store/categories";
export default {
  setup() {
    const count = computed(() =>
      categories.reduce((acc, cur) => acc + cur.children.length + 1, 0)
    );
    return {
      count,
      categories,
    };
  },
};
</script>

<style lang="postcss" scoped>
.categories-wrapper {
  @apply py-5 px-8;
}
.categories-wrapper .title {
  @apply text-4xl text-center text-green-800 leading-loose;
}

.categories-wrapper .category-list-wrapper {
  @apply mt-2;
}

.categories-wrapper .category-list .category-list {
  @apply pl-1.5  mt-2;
}

.categories-wrapper .list-item {
  @apply relative my-1.5 pl-5 leading-loose;
}

.categories-wrapper .list-item::before {
  content: "";
  border: 3px solid #49b1f5;
  left: 0;
  top: 0.65rem;
  @apply absolute w-3 h-3 rounded-full cursor-pointer transition-all duration-200 ease-in-out;
}

.categories-wrapper .list-item:hover::before {
  border-color: #ff7242;
}
</style>