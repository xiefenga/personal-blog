import axios from 'axios'
import { setInterceptors } from '@/utils/helper'

axios.defaults.timeout = 2500;

export const login = axios.create({
  baseURL: '/api/admin'
});

export const tag = axios.create({
  baseURL: '/api/tag'
});

export const category = axios.create({
  baseURL: '/api/category'
});

export const article = axios.create({
  baseURL: '/api/article'
});

export const oss = axios.create({
  baseURL: '/api/oss'
});

setInterceptors(login, tag, category, article, oss);


