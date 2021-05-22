import axios from 'axios'
import { correctInterceptor, errorInterceptor } from './interceptors'

axios.defaults.timeout = 2500;

const login = axios.create({
  baseURL: '/api/admin'
});

const tag = axios.create({
  baseURL: '/api/tag'
});

const category = axios.create({
  baseURL: '/api/category'
});

login.interceptors.response.use(correctInterceptor, errorInterceptor);

tag.interceptors.response.use(correctInterceptor, errorInterceptor);

category.interceptors.response.use(correctInterceptor, errorInterceptor);

export { login, tag, category }