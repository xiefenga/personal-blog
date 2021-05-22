import { category as axios } from './axios'

const getCategories = async () => axios.get('/');

const addCategory = async value => axios.post('/', value);

const updateCategory = async (id, value) => axios.put('/' + id, value);

const deleteCategory = async id => axios.delete('/' + id);

export { getCategories, addCategory, updateCategory, deleteCategory }