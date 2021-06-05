import axios from './instances'

export const getTags = async () => {
  return axios.get('/tag');
}