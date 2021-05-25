import { oss as axios } from './instances'

export const getConfig = async () => axios.get('/');