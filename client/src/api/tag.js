import axios from './instances'

export const getTags = async () => {
  return axios.get('/tag');
}

export const getTagArticles = async id => {
  return axios.get('/tag/' + id);
}