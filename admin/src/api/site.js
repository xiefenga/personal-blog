import { site as axios } from './instances'

export const getSiteInfo = async () => axios.get('/');