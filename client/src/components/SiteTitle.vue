<template>
  <div class="site-info">
    <h1 class="site-title">{{ title }}</h1>
    <daily-sentence class="site-subtitle" :sentences="subtitle" />
  </div>
</template>

<script>
import DailySentence from "./DailySentence.vue";
export default {
  components: {
    DailySentence,
  },
  props: {
    title: {
      props: String,
      required: true,
    },
    subtitle: {
      props: Array,
      required: true,
    },
  },
};
</script>

<style lang="postcss" scoped>
.site-info {
  @apply absolute w-full text-white text-center leading-normal;
  top: 43%;
}

.site-info h1 {
  text-shadow: 0.1rem 0.1rem 0.2rem rgb(0 0 0 / 15%);
  @apply text-4xl font-bold leading-normal;
}

.site-info .site-subtitle {
  @apply text-xl leading-normal;
}
</style>