import axios from './instances'

export const getCategories = async () => axios.get('/category');