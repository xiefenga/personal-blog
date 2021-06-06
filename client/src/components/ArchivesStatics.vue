<template>
  <statistic-card class="archives-statics">
    <template #headline>
      <i class="iconfont">&#xe6b0;</i>
      <span>归档</span>
    </template>
    <ul class="archive-list">
      <li
        class="archive-list-item"
        v-for="item in archivsStatistics"
        :key="item.id"
      >
        <span class="date"> {{ item.date }}</span>
        <span class="count">{{ item.count }}</span>
      </li>
    </ul>
  </statistic-card>
</template>


<script setup>
import StatisticCard from "./StatisticCard.vue";
import { archives } from "@/store/archives";
import { yearAndMonthStr2ZH } from "@/utils/helper";
import { computed } from "vue";
const archivsStatistics = computed(() =>
  archives.map(([date, articles]) => ({
    date: yearAndMonthStr2ZH(date),
    count: articles.length,
    id: articles[0].id,
  }))
);
</script>

<style lang="postcss" scoped>
.archives-statics .headline .iconfont {
  vertical-align: -2px;
  @apply mr-1 text-2xl;
}

.archives-statics .archive-list {
  @apply leading-8 text-sm;
}

.archives-statics .archive-list .archive-list-item {
  @apply flex justify-between cursor-pointer transition-all duration-300 p-0 box-border;
}

.archives-statics .archive-list .archive-list-item:hover {
  background-color: #49b1f5;
  @apply px-3.5;
}

.archive-list .archive-list-item span {
  @apply block truncate;
}

.archive-list .archive-list-item .date {
  @apply w-4/5;
}
.archive-list .archive-list-item .count {
  @apply text-right w-1/5;
}
</style>