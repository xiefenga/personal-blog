<template>
  <footer>
    <div class="copyright">©{{ copyrightYear }} By Xie Feng</div>
    <div class="ipc">
      <a :href="ICP" target="_blank">苏ICP备 2020051656号</a>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => ({
    ICP: "https://beian.miit.gov.cn/",
    startYear: 2020,
    curYear: new Date().getFullYear(),
  }),
  computed: {
    copyrightYear() {
      if (this.startYear === this.curYear) {
        return this.curYear;
      }
      return `${this.startYear} - ${this.curYear}`;
    },
  },
};
</script>

<style lang="postcss" scoped>
footer {
  background: #49b1f5;
  background-image: url("http://xiefeng.tech/custom_assets/img/index_top.jpg");
  color: #eee;
  @apply px-5 py-12 leading-loose text-center bg-bottom bg-cover;
}

footer .ipc {
  @apply hover:underline;
}
</style>
