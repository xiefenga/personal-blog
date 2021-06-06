<template>
  <content-card class="about-me">
    <div v-html="aboutMe"></div>
  </content-card>
</template>

<script setup>
import { author } from "@/store/site";
import ContentCard from "./ContentCard.vue";
const { about: aboutMe } = author;
</script>

<style lang="postcss" scoped>
.about-me {
  @apply leading-loose text-sm;
}

.about-me >>> p {
  @apply mb-2;
}
</style>