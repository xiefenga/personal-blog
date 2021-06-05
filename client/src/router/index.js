import routes from './routes'
import { createRouter, createWebHistory } from 'vue-router'
import { startLoading } from '@/utils/helper';

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

router.beforeEach((to, from) => {
  // 直接加载，不是跳转 from.matched.length === 0
  if (from.matched.length) {
    startLoading();
  }
});

export default router
