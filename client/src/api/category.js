import axios from './instances'

export const getCategories = async () => axios.get('/category');

export const getCategoryArticles = async id => {
  return axios.get('/category/' + id);
}