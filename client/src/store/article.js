import { getArticle } from "@/api/article";
import { reactive, readonly, toRefs } from "vue";

const state = reactive({});

export const article = readonly(state);

export const fetchArticle = async title => {
  const { data } = await getArticle(title);
  for (const prop in data) {
    if (Object.hasOwnProperty.call(data, prop)) {
      state[prop] = data[prop];
    }
  }
}