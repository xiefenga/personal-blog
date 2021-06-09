import { computed } from 'vue'
import { tags } from "@/store/tags";
import { randomFontSize, randomTextColor } from '@/utils/helper';

export const useTagCloud = () => {
  return computed(() => tags.map(tag => ({
    ...tag,
    style: {
      fontSize: randomFontSize(tag.id),
      color: randomTextColor(tag.id),
    }
  })));
}