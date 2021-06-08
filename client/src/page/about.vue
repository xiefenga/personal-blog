<template>
  <div class="about-me" v-html="about"></div>
</template>

<script setup>
import { siteInfo } from "@/store/site";
const { aboutMe } = siteInfo;
import { mdParser } from "@/utils/helper";
import { computed } from "vue";
const about = computed(() =>
  mdParser.render(aboutMe.value.replaceAll("\n", "\n\n"))
);
</script>

<style lang="postcss" scoped>
.about-me {
  @apply leading-loose text-sm p-4;
}

.about-me >>> p {
  @apply mb-2;
}
</style>