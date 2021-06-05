<template>
  <card-widget class="about-me">
    <div v-html="aboutMe"></div>
  </card-widget>
</template>

<script setup>
import { computed } from "vue";
import { aboutMe } from "@/store/siteInfo";
import MdIt from "markdown-it";
import CardWidget from "./CardWidget.vue";
const md = new MdIt();
// const about = computed(() => md.render(aboutMe.value));
// console.log(aboutMe);
</script>

<style lang="postcss" scoped>
.about-me {
  @apply py-8 px-8 leading-loose text-sm;
}

.about-me >>> p {
  @apply mb-2;
}
</style>