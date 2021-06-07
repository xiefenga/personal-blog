import { site as axios } from './instances'

export const getSiteInfo = async () => axios.get('/');

export const updateSiteInfo = async value => axios.post('/', { ...value });
