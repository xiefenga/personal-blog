<template>
  <card-widget class="error-wrap">
    <div class="error-content">
      <div class="error-img">
        <img src="http://xiefeng.tech/custom_assets/img/index_top.jpg" />
      </div>
      <div class="error-info">
        <h1 class="error-title">404</h1>
        <div class="error-subtitle">页面没有找到</div>
        <router-link class="btn" to="/"> 回到主页 </router-link>
      </div>
    </div>
  </card-widget>
</template>

<script setup>
import CardWidget from "@/components/CardWidget.vue";
</script>

<style lang="postcss" scoped>
.error-wrap {
  width: 1000px;
  @apply fixed top-2/4 right-0 left-0  box-border m-auto transform  -translate-y-2/4;
}

.error-wrap .error-content {
  @apply flex items-center;
  height: 360px;
}

.error-wrap .error-content .error-img {
  @apply w-2/4 h-full;
}

.error-wrap .error-content .error-img img {
  @apply w-full h-full object-cover object-center;
}

.error-wrap .error-content .error-info {
  @apply w-2/4 text-center px-1;
}

.error-wrap .error-content .error-info .error-title {
  @apply text-9xl font-bold;
}

.error-wrap .error-content .error-info .error-subtitle {
  @apply text-2xl mt-12;
}

.error-wrap .error-content .error-info .btn {
  @apply inline-block bg-blue-400 py-1.5 px-6 mt-2 text-white;
}
</style>