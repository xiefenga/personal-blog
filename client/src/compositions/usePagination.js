import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'


export const usePagination = (baseURL) => {
  const route = useRoute();
  const router = useRouter();
  const page = computed(() => Number(route.params.page || 1));
  const pageChange = (page) => {
    router.push(page === 1 ? baseURL : `${baseURL}/page/${page}`);
  };
  const pageError = () => router.replace("/404");
  return {
    page,
    pageChange,
    pageError,
  };
}