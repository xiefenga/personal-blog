<template>
  <ul class="tree-list">
    <li class="list-item-wrapper" v-for="item in data" :key="item.id">
      <div class="list-item">
        <div class="item-data">
          <slot :item="item"></slot>
        </div>
        <div
          class="expand-icon"
          v-if="canExpand(item)"
          @click="triggle(item.id)"
        >
          <i class="iconfont" v-if="expand(item.id)">&#xe6ec;</i>
          <i class="iconfont" v-else>&#xe6ed;</i>
        </div>
      </div>
      <template v-if="canExpand(item)">
        <tree-list
          v-show="expand(item.id)"
          :data="item.children"
          v-slot="{ item }"
        >
          <slot :item="item"></slot>
        </tree-list>
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  name: "tree-list",
  props: {
    data: {
      type: Array,
      defalut: () => [],
    },
  },
  data: () => ({
    expands: new Map(),
  }),
  methods: {
    expand(id) {
      const existed = this.expands.has(id);
      !existed && this.expands.set(id, false);
      return this.expands.get(id);
    },
    canExpand(item) {
      return item.children && Array.isArray(item.children);
    },
    triggle(id) {
      this.expands.set(id, !this.expands.get(id));
    },
  },
};
</script>

<style lang="postcss" scoped>
.tree-list {
  @apply leading-8 text-sm;
}

.tree-list .tree-list {
  @apply ml-4;
}

.tree-list .list-item-wrapper .list-item {
  @apply flex items-center cursor-pointer transition-all duration-300 p-0 box-border;
}

.tree-list .list-item-wrapper .list-item:hover {
  background-color: #49b1f5;
  @apply pl-2 pr-1.5;
}

.tree-list .list-item-wrapper .list-item .item-data {
  @apply flex-1 truncate;
}

.tree-list .list-item-wrapper .list-item .expand-icon {
  @apply text-2xl ml-auto select-none;
}

.tree-list .iconfont {
  font-size: inherit;
}
</style>