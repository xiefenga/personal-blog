import { getArchives } from '@/api/article';
import { articles2Archives } from '@/utils/helper';
import { reactive, readonly } from 'vue'

const _archives = reactive([]);

export const archives = readonly(_archives);

export const fetchArchives = async () => {
  const { data } = await getArchives();
  _archives.push(...articles2Archives(data));
}