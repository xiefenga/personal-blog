import axios from 'axios'

const ins = axios.create({
  baseURL: '/api'
});

ins.interceptors.response.use(resp => resp.data);

export default ins;





