<template>
  <div class="tag-cloud">
    <div class="title">标签 - {{ tags.length }}</div>
    <div class="tag-list">
      <router-link
        class="tag-item"
        v-for="tag in tags"
        :key="tag.id"
        :style="tag.style"
        :to="`/tags/${tag.name}`"
      >{{ tag.name }}</router-link>
    </div>
  </div>
</template>

<script setup>
import { useTagCloud } from "@/compositions/useTagCloud";

const tags = useTagCloud();
</script>


<style lang="postcss" scoped>
.tag-cloud {
  @apply text-2xl px-4 py-7;
}
.tag-cloud .title {
  @apply text-4xl text-center text-green-800 leading-loose;
}

.tag-cloud .tag-list {
  @apply flex flex-wrap justify-center  items-baseline;
}

.tag-cloud .tag-item {
  @apply mx-2 leading-loose transition duration-300 ease-in-out;
}

.tag-cloud .tag-item:hover {
  color: rgb(96, 165, 250) !important;
  @apply transform scale-110;
}
</style>