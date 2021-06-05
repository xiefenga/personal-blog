import { site } from './instances'

export const getSiteInfo = async () => site.get('/');