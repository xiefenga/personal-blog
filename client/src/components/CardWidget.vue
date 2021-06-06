<template>
  <div class="card-widget">
    <slot></slot>
  </div>
</template>

<style lang="postcss" scoped>
.card-widget {
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.06);
  @apply rounded-xl overflow-hidden transition duration-300;
}

.card-widget:not(:first-of-type) {
  @apply mt-6;
}

.card-widget:hover {
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.15);
}
</style>