<template>
  <div class="pagination">
    <template v-if="count > 1">
      <span class="prev" v-if="current > 1" @click="onClick(current - 1)">
        <i class="iconfont">&#xe72c;</i>
      </span>
      <span
        class="page-number"
        v-for="page in count"
        :key="page"
        :class="{ current: page === current }"
        @click="onClick(page)"
      >
        {{ page }}
      </span>
      <!-- <span class="space" >…</span> -->
      <span class="next" v-if="current < count" @click="onClick(current + 1)">
        <i class="iconfont">&#xe72b;</i>
      </span>
    </template>
  </div>
</template>

<script>
import { computed, toRefs, watchEffect } from "vue";
import { PAGINATION_PAGE_SIZE } from "@/utils/constants";
export default {
  props: {
    // 当前页码
    current: {
      type: Number,
      default: 0,
    },
    // 页码显示数量的限制
    limit: {
      type: Number,
    },
    // 每页的数量
    size: {
      type: Number,
      default: PAGINATION_PAGE_SIZE,
    },
    // 总的数量
    total: {
      type: Number,
      default: 0,
    },
  },
  setup(props, ctx) {
    const { total, size, current } = toRefs(props);

    const { emit } = ctx;

    const count = computed(() => Math.ceil(total.value / size.value));

    const onClick = (page) => {
      if (page > 0 && page !== current.value) {
        emit("page-change", page);
      }
    };

    watchEffect(() => {
      if (
        current.value > count.value &&
        current.value !== 0 &&
        count.value !== 0
      ) {
        emit("page-error", current.value);
      }
    });

    return {
      count,
      onClick,
    };
  },
};
</script>

<style lang="postcss" scoped>
.pagination {
  @apply text-gray-500 flex justify-center select-none;
}

.pagination .prev,
.pagination .next,
.pagination .page-number {
  vertical-align: 0px;
  @apply block w-6 h-6 mx-1 leading-6 text-center box-content;
}

.pagination .prev,
.pagination .next {
  @apply m-0;
}

.pagination .page-number:not(.current) {
  @apply hover:text-blue-400 cursor-pointer;
}

.pagination .page-number.current {
  background-color: #00c4b6;
  @apply text-white;
}

.pagination .iconfont {
  font-size: inherit;
  line-height: inherit;
  @apply block hover:text-blue-400  cursor-pointer;
}
</style>
