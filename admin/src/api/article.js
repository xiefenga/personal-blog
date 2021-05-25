import { article as axios } from './instances'

export const postArticle = async info => axios.post('/', info);

export const updateArticle = async (id, info) => axios.put('/' + id, info);

export const getArticles = async (page = 1, size = 10) => axios.get('/', { params: { page, size } });

export const deleteArticle = async id => axios.delete('/' + id);

