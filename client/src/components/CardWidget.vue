<template>
  <div class="card-widget">
    <div v-if="headline" class="headline">
      <slot name="headline" />
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    headline: {
      type: Boolean,
      defalut: false,
    },
  },
};
</script>

<style lang="postcss" scoped>
.card-widget {
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.06);
  @apply rounded-xl overflow-hidden transition duration-300 py-5 px-6;
}

.card-widget:not(:first-of-type) {
  @apply mt-6;
}

.card-widget:hover {
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.15);
}

.card-widget .headline {
  @apply text-lg leading-loose mb-2 text-gray-600;
}
</style>