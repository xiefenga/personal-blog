import { daily } from './instances'

export const getDailySentence = async () => daily.get('/quote');