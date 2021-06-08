<template>
  <card-widget headline class="archives-card">
    <template #headline>
      <i class="iconfont">&#xe6b0;</i>
      <span>归档</span>
    </template>
    <tree-list :data="archivsStatistics" v-slot="{ item }">
      <div class="archives-item">
        <span class="date">{{ item.date }}</span>
        <span class="count">{{ item.count }}</span>
      </div>
    </tree-list>
  </card-widget>
</template>


<script>
import { computed } from "vue";
import TreeList from "../TreeList.vue";
import CardWidget from "../CardWidget.vue";
import { archives } from "@/store/article";
import { yearAndMonthStr2ZH } from "@/utils/helper";

export default {
  components: {
    TreeList,
    CardWidget,
  },
  setup() {
    const archivsStatistics = computed(() =>
      archives.value.map(([date, articles]) => ({
        date: yearAndMonthStr2ZH(date),
        count: articles.length,
        id: articles[0].id,
      }))
    );
    return {
      archivsStatistics,
    };
  },
};
</script>

<style lang="postcss" scoped>
.archives-card .headline .iconfont {
  vertical-align: -2px;
  @apply mr-1 text-2xl;
}

.archives-card .archives-item {
  @apply flex px-2;
}

.archives-card .archives-item span {
  @apply block truncate;
}

.archives-card .archives-item .date {
  @apply w-4/5;
}

.archives-card .archives-item .count {
  @apply text-center w-1/5;
}
</style>