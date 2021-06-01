import { writeFile } from 'fs/promises'
import { getQuoteCache } from '../utils/helper'
import { QUOTE_CACHE_PATH } from '../utils/constants'
import { getDailyQuote as requestDailyQuote } from '../request/dailyquote'

export const saveDailyQuote = async () => {
  const quote = await requestDailyQuote();
  try {
    await writeFile(
      QUOTE_CACHE_PATH,
      JSON.stringify(quote, null, 2)
    );
  } catch (__) { }
}

export const getDailyQuote = () => getQuoteCache();