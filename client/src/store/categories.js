import { reactive, readonly } from 'vue';
import { getCategories } from '@/api/category';

const state = reactive([]);

export const categories = readonly(state);

export const fetchCategories = async () => {
  const { data } = await getCategories();
  state.splice(0);
  state.push(...data);
}