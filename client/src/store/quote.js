import { reactive, readonly } from 'vue'
import { getDailySentence } from "@/api/daily";
import { DEFAULT_SENTENCE } from '@/utils/constants'

const state = reactive([DEFAULT_SENTENCE]);

export const quote = readonly(state);

export const fetchQuote = async () => {
  const { data: { content, translation } } = await getDailySentence();
  state.splice(0);
  state.push(translation, content);
}

