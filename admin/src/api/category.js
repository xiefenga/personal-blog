import { category as axios } from './instances'

export const getCategories = async () => axios.get('/');

export const addCategory = async value => axios.post('/', value);

export const updateCategory = async (id, value) => axios.put('/' + id, value);

export const deleteCategory = async id => axios.delete('/' + id);
