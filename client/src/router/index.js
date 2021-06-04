import routes from './routes'
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

export default router
