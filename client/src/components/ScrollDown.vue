<template>
  <div class="scroll-down" @click="scrollDown">
    <div class="arrow">
      <i class="iconfont">&#xe600;</i>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount } from "vue";
import { HEADER_HEIGHT, SCROLL_PER_DIS } from "@/utils/constants";
import { useScrollPageY } from "@/compositions/useScroll";

const [scrollDown, cancelScroll] = useScrollPageY(HEADER_HEIGHT);

onBeforeUnmount(cancelScroll);
</script>

<style lang="postcss" scoped>
.scroll-down {
  @apply w-full h-10 cursor-pointer;
}

.scroll-down .arrow {
  @apply h-full text-center animate-bounce;
}

.scroll-down .iconfont {
  text-shadow: 0.1rem 0.1rem 0.2rem rgb(0 0 0 / 15%);
  @apply text-xl font-black text-white leading-normal animate-pulse;
}
</style>