import home from '@/page/home.vue'
import notFount from '@/page/404.vue'
import Tags from '@/page/tags.vue'
import ArticleList from '@/components/ArticleList.vue'
import AboutMe from '@/page/about.vue'
import categories from '@/page/categories.vue'
import ArchivesList from '@/components/ArchivesList.vue'
import ArticleContent from '@/components/ArticleContent.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    children: [
      {
        path: '/',
        meta: { home: true },
        component: ArticleList
      },
      {
        path: '/page/:page',
        name: 'article-list',
        meta: { home: true },
        component: ArticleList
      },
      {
        path: '/:article',
        meta: { article: true },
        component: ArticleContent,
      },
      {
        path: '/archives',
        meta: { title: '归档' },
        component: ArchivesList
      },
      {
        path: '/tags',
        meta: { title: '标签' },
        component: Tags,
      },
      {
        path: '/tags/:name',
        component: {}
      },
      {
        path: '/categories',
        name: 'categories',
        meta: { title: '分类' },
        component: categories,
      },
      {
        path: '/categories/:p/:c?',
        component: {},
      },
      {
        path: '/about',
        name: 'about-me',
        meta: { title: '关于我' },
        component: AboutMe
      }
    ]
  },
  {
    path: '/404',
    component: notFount
  }
];

export default routes