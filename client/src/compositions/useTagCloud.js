import { computed } from "vue";
import { useStore } from "vuex";
import { randomFontSize, randomTextColor } from '@/utils/helper';

export const useTagCloud = () => {
  const store = useStore();
  const tags = computed(() => store.state.tags);
  return computed(() => tags.value.map(tag => ({
    ...tag,
    style: {
      fontSize: randomFontSize(tag.id),
      color: randomTextColor(tag.id),
    }
  })));
}