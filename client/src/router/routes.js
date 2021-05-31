import Home from '@/pages/home.vue'
import About from '@/pages/about.vue'
import Tags from '@/pages/tags.vue'
import Archives from '@/pages/archives.vue'
import Categories from '@/pages/categories.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/archives',
    name: 'archives',
    component: Archives
  },
  {
    path: '/tags',
    name: 'tags',
    component: Tags
  },
  {
    path: '/categories',
    name: 'categories',
    component: Categories
  }
];

export default routes