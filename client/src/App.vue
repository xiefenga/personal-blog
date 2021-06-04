<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue";
import { CONSOLE_STR } from "@/utils/constants";
// onMounted(() => console.log(CONSOLE_STR));
</script>

<style>
#app {
  height: 10000px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
    Lato, Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
}
body {
  cursor: url(/cursor.ico), default;
}
</style>

// /* scrollbar */
<style>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-corner {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #49b1f5;
  background-image: linear-gradient(
    45deg,
    hsla(0, 0%, 100%, 0.4) 25%,
    transparent 0,
    transparent 50%,
    hsla(0, 0%, 100%, 0.4) 0,
    hsla(0, 0%, 100%, 0.4) 75%,
    transparent 0,
    transparent
  );
  border-radius: 2em;
}

::-webkit-scrollbar-track {
  background-color: rgba(73, 177, 245, 0.2);
  border-radius: 2em;
}
</style>
