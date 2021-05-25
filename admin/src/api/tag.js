import { tag as axios } from './instances'

export const getTags = async () => axios.get('/');

export const addTag = async name => axios.post('/', { name });

export const updateTag = async (id, name) => axios.put('/' + id, { name });

export const deleteTag = async id => axios.delete('/' + id);

