<template>
  <div class="scroll-down" @click="scrollDown">
    <div class="arrow">
      <i class="iconfont">&#xe600;</i>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount } from "vue";
import { SCROLL_Y_OFFSET, SCROLL_PER_DIS } from "@/utils/constants";

let id = null;

const scrollDown = () => {
  const offset = window.pageYOffset;
  id = requestAnimationFrame(() => {
    if (offset >= SCROLL_Y_OFFSET) {
      window.scrollTo(0, SCROLL_Y_OFFSET);
      return;
    }
    window.scrollTo(0, offset + SCROLL_PER_DIS);
    scrollDown();
  });
};

onBeforeUnmount(() => cancelAnimationFrame(id));
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