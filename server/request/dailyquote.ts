import axios from 'axios'
import { IQuote } from '../types/request'
import { QUOTE_URL } from '../utils/constants'

axios.interceptors.response.use(resp => resp.data);

export const getDailyQuote = async () => {
  const {
    id,
    content,
    translation,
    author,
    assign_date
  }: IQuote = await axios.get(QUOTE_URL);

  const quote: IQuote = { id, content, translation, author, assign_date };

  return quote;
}



