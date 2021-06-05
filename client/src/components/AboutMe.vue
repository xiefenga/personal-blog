<template>
  <card-widget class="about-me">
    <div v-html="aboutMe"></div>
  </card-widget>
</template>

<script setup>
import { author } from "@/store/site";
import CardWidget from "./CardWidget.vue";
const { about: aboutMe } = author;
</script>

<style lang="postcss" scoped>
.about-me {
  @apply py-8 px-8 leading-loose text-sm;
}

.about-me >>> p {
  @apply mb-2;
}
</style>