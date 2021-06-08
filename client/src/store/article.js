import { articles2Archives } from '@/utils/helper';
import { getArticle, getArticles } from "@/api/article";
import { reactive, readonly, computed, toRefs } from "vue";

const initProps = {
  title: '',
  content: '',
  createdAt: '',
  updatedAt: '',
  words: 0,
  views: 0,
  cover: '',
  categories: [],
  tags: []
}

const _allArticles = reactive([]);

const _archives = computed(() => [...articles2Archives(_allArticles)]);

const _count = computed(() => _allArticles.length);

const _article = reactive({ ...initProps });

export const allArticles = readonly(_allArticles);

export const archives = readonly(_archives);

export const count = readonly(_count);

export const article = toRefs(readonly(_article));

export const fetchArticles = async () => {
  const { data } = await getArticles();
  _allArticles.splice(0);
  _allArticles.push(...data);
}


export const fetchArticle = async id => {
  const { data } = await getArticle(id);
  for (const prop in data) {
    if (Object.hasOwnProperty.call(data, prop)) {
      _article[prop] = data[prop];
    }
  }
}


export const clearArticle = () => {
  for (const prop in initProps) {
    if (Object.hasOwnProperty.call(initProps, prop)) {
      _article[prop] = initProps[prop];
    }
  }
}