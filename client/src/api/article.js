import axios from './instances';

export const getArticleList = async (page = 1, size) => {
  return axios.get('/article', {
    params: { page, size }
  });
}

export const getArticle = async title => {
  return axios.get('/article/' + title);
}