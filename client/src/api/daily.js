import axios from './instances'

export const getDailySentence = async () => axios.get('/daily/quote');