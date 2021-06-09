import home from '@/page/home.vue'
import notFount from '@/page/404.vue'
import Tags from '@/page/tags.vue'
import ArticleList from '@/components/ArticleList.vue'
import AboutMe from '@/page/about.vue'
import categories from '@/page/categories.vue'
import ArchivesList from '@/components/ArchivesList.vue'
import ArticleContent from '@/components/ArticleContent.vue'
import TagArticles from '@/components/TagArticles.vue'
import CategoryArticles from '@/components/CategoryArticles.vue'

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
        path: '/archives/page/:page',
        meta: { title: '归档' },
        component: ArchivesList
      },
      {
        path: '/tags',
        meta: { title: '标签' },
        component: Tags,
      },
      {
        path: '/tags/:tag',
        meta: { tag: true },
        component: TagArticles
      },
      {
        path: '/tags/:tag/page/:page',
        meta: { tag: true },
        component: TagArticles
      },
      {
        path: '/categories',
        name: 'categories',
        meta: { title: '分类' },
        component: categories,
      },
      {
        path: '/categories/:top/:category?',
        meta: { category: true },
        component: CategoryArticles,
      },
      {
        path: '/categories/:top/page/:page',
        meta: { category: true },
        component: CategoryArticles,
      },
      {
        path: '/categories/:top/:category/page/:page',
        meta: { category: true },
        component: CategoryArticles,
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
    path: '/:pathMatch(.*)*',
    alias: '/404',
    name: 'not-fonud',
    component: notFount
  }
];

export default routes