import ArticleList from '@/components/ArticleList.vue'
import AboutMe from '@/components/AboutMe.vue'
import ArchivesList from '@/components/ArchivesList.vue'
import ArticleContent from '@/components/ArticleContent.vue'



const routes = [
  {
    path: '/',
    component: ArticleList,
  },
  {
    path: '/page/:page',
    component: ArticleList
  },
  {
    path: '/:article',
    component: ArticleContent
  },
  {
    path: '/about',
    component: AboutMe
  },
  {
    path: '/archives',
    component: ArchivesList
  },
  {
    path: '/tags/:id?',
    component: {}
  },
  // {
  //   path: '/categories',
  //   name: 'categories',
  //   component: Categories
  // }
];

export default routes