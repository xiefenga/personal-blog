import { computed } from 'vue';
import { useRoute } from "vue-router";
import { allArticles } from "@/store/article";


export const useGetCurArticle = () => {
  const route = useRoute();
  const article = computed(() => {
    const title = route.params.article;
    return allArticles.find((a) => a.title === title);
  });
  return article;
}