import { getTags } from '@/api/tag';
import { reactive, readonly } from 'vue'

const state = reactive([]);

export const tags = readonly(state);

export const fetchTags = async () => {
  const { data } = await getTags();
  state.splice(0);
  state.push(...data);
}