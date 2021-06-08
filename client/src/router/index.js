import routes from './routes'
import { startLoading, doneLoading } from '@/utils/helper';
import { allArticles } from "@/store/article";
import { fetchArticle } from "@/store/article";
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (_, __, savedPosition) => {
    if (!savedPosition) {
      return { top: 0 };
    }
    return savedPosition;
  }
});

// router.beforeEach(async (to, from) => {
//   // 直接加载，不是跳转 from.matched.length === 0
//   if (from.matched.length && to.meta.article) {
//     startLoading();
//     const { article } = to.params;
//     const { id } = allArticles.find((a) => a.title === article);
//     await fetchArticle(id);
//     doneLoading();
//   }
// });

export default router
