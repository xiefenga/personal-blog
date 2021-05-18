import { login as axios } from './axios'

const login = async (loginInfo) => {
  return axios.post('/login', loginInfo);
}

const whoAmI = async () => {
  return axios.get('/whoami');
}

const logout = async () => {
  return axios.get('/logout');
}

export { login, whoAmI, logout }

