import ArticleList from '@/components/ArticleList.vue'
import AboutMe from '@/components/AboutMe.vue'
import ArchivesList from '@/components/ArchivesList.vue'



const routes = [
  {
    path: '/:page?',
    name: 'home',
    component: ArticleList
  },
  {
    path: '/about',
    name: 'about',
    component: AboutMe
  },
  {
    path: '/archives',
    name: 'archives',
    component: ArchivesList
  },
  // {
  //   path: '/tags',
  //   name: 'tags',
  //   component: Tags
  // },
  // {
  //   path: '/categories',
  //   name: 'categories',
  //   component: Categories
  // }
];

export default routes