import { tag as axios } from './axios'

const getTags = async () => axios.get();

const addTag = async name => axios.post('/', { name });

const updateTag = async (id, name) => axios.put('/' + id, { name });

const deleteTag = async id => axios.delete('/' + id);

export { getTags, addTag, updateTag, deleteTag }
