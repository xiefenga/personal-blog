import axios from 'axios'

export const daily = axios.create({
  baseURL: '/api/daily'
});

export const article = axios.create({
  baseURL: '/api/article'
});

export const site = axios.create({
  baseURL: 'api/site'
});

daily.interceptors.response.use(resp => resp.data);

article.interceptors.response.use(resp => resp.data);

site.interceptors.response.use(resp => resp.data);



