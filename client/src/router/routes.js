import ArticleList from '@/components/ArticleList.vue'
import AboutMe from '@/components/AboutMe.vue'
import ArchivesList from '@/components/ArchivesList.vue'
import ArticleContent from '@/components/ArticleContent.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ArticleList,
  },
  {
    path: '/page/:page',
    name: 'article-list',
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
    path: '/tags',
    component: {},
  },
  {
    path: '/tags/:name',
    component: {}
  },
  {
    path: '/categories',
    name: 'categories',
    component: {},
  },
  {
    path: '/categories/:p/:c?',
    component: {},
  }

];

export default routes