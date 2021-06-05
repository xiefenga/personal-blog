import axios from './instances'

export const getSiteInfo = async () => axios.get('/site');