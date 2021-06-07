import { mkdir } from 'fs/promises'
import { getQuoteCache, writeJSONFile } from '../utils/helper'
import { CACHE_DIR_PATH, QUOTE_CACHE_PATH } from '../utils/constants'
import { getDailyQuote as requestDailyQuote } from '../request/daily-quote'

export const saveDailyQuote = async (): Promise<void> => {
  const quote = await requestDailyQuote();
  try {
    await writeJSONFile(QUOTE_CACHE_PATH, quote);
  } catch (error) {
    // 文件夹不存在的情况
    if (error.errno === -4058) {
      // fsPromises.mkdir() 仅在 recursive 为 false 时才导致拒绝
      // 永远不会 reject 
      await mkdir(CACHE_DIR_PATH, { recursive: true });
      try {
        await writeJSONFile(QUOTE_CACHE_PATH, quote);
      } catch (__) { }
    }
  }
}

export const getDailyQuote = () => getQuoteCache();