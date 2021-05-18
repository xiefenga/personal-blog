import axios from 'axios'
import { correctInterceptor, errorInterceptor } from './interceptors'

axios.defaults.timeout = 2500;

const login = axios.create({
  baseURL: '/api/admin'
});

login.interceptors.response.use(correctInterceptor, errorInterceptor);

export { login }