import { article as axios } from './axios'

const postArticle = async info => axios.post('/', info);

const updateArticle = async (id, info) => axios.put('/' + id, info);

export { postArticle, updateArticle }
