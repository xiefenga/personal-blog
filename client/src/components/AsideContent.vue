<template>
  <div class="aside-content">
    <author-card />
    <!-- <recent-card /> -->
    <tags-card />
    <archives-card />
  </div>
</template>

<script setup>
import TagsCard from "./TagsCloud.vue";
import AuthorCard from "./AuthorCard.vue";
import RecentCard from "./RecentCard.vue";
import ArchivesCard from "./ArchivesStatics.vue";
</script>

<style lang="postcss" scoped>
</style>