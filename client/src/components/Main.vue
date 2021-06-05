<template>
  <main>
    <div class="main-content">
      <slot></slot>
    </div>
    <aside-content />
  </main>
</template>

<script setup>
import AsideContent from "@/components/AsideContent.vue";
</script>

<style lang="postcss" scoped>
main {
  margin: 0 auto;
  padding: 2rem 15px;
  max-width: 1200px;
  display: flex;
}

main .main-content {
  width: 75%;
}

main .aside-content {
  width: 25%;
  padding-left: 15px;
  box-sizing: content-box;
}
</style>