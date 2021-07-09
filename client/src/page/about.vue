<template>
  <div class="about-me" v-html="about"></div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { mdParser } from "@/utils/helper";

const store = useStore();

const aboutMe = computed(() => store.state.siteInfo.aboutMe);

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