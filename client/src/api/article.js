import axios from './instances';

const baseURL = '/article';

export const getArticleList = async (page = 1, size) => {
  return axios.get(baseURL, {
    params: { page, size }
  });
}

export const getArticle = async id => {
  return axios.get(`${baseURL}/${id}`);
}

export const getArticles = async () => {
  return axios.get(`${baseURL}/all`);
}