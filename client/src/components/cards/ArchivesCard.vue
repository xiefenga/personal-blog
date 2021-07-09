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

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import TreeList from "../TreeList.vue";
import CardWidget from "../CardWidget.vue";
import { FETCH_ARTICLES_MAP } from "@/store/actions";
import { yearAndMonthStr2ZH, articles2Archives } from "@/utils/helper";

const store = useStore();

store.dispatch(FETCH_ARTICLES_MAP);

const archivsStatistics = computed(() => [...articles2Archives(store.getters.allArticles)].map(([date, articles]) => ({
  date: yearAndMonthStr2ZH(date),
  count: articles.length,
  id: articles[0].id,
})));

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