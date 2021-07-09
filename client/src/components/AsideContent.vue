<template>
  <div class="aside-content">
    <author-card />
    <recent-card />
    <categories-card />
    <tags-card />
    <archives-card />
  </div>
</template>

<script setup>
import TagsCard from "./cards/TagsCard.vue";
import AuthorCard from "./cards/AuthorCard.vue";
import RecentCard from "./cards/RecentCard.vue";
import ArchivesCard from "./cards/ArchivesCard.vue";
import CategoriesCard from "./cards/CategoriesCard.vue";
</script>

<style lang="postcss" scoped>
</style>