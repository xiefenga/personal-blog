import { article } from './instances';

export const getArticleList = async (page = 1, size) => article.get('/', {
  params: { page, size }
});