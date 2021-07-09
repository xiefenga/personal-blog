import { createStore } from "vuex";
import { getTags } from "@/api/tag";
import { getSiteInfo } from "@/api/site";
import { PRODUCTION } from "@/utils/constants";
import { getCategories } from "@/api/category";
import { getArticle, getArticles } from "@/api/article";
import { FETCH_ARTICLES_MAP, FETCH_ARTICLE, FETCH_CATEGORIES, FETCH_TAGS, FETCH_SITE_INFO } from "./actions";
import { SET_ARTICLES_MAP, SET_ARTICLE, CLEAR_ARTICLE, SET_CATEGORIES, SET_TAGS, SET_SITE_INFO } from "./mutations";

const siteInfoProps = ['author', 'github', 'mail', 'avatar', 'aboutMe', 'siteName', 'beian'];

const initSiteInfo = siteInfoProps.reduce((info, prop) => ({ ...info, [prop]: '' }), {});

const initArticle = {
  title: '',
  content: '',
  createdAt: '',
  updatedAt: '',
  words: 0,
  views: 0,
  cover: '',
  categories: [],
  tags: []
}

const store = createStore({
  strict: !PRODUCTION,
  state: {
    tags: [],
    categories: [],
    siteInfo: { ...initSiteInfo },
    articlesMap: new Map(),
    article: { ...initArticle }
  },
  getters: {
    allArticles: state => [...state.articlesMap.values()]
  },
  mutations: {
    [SET_TAGS]: (state, tags) => state.tags = tags,
    [SET_SITE_INFO]: (state, info) => state.siteInfo = info,
    [SET_ARTICLE]: (state, article) => state.article = article,
    [SET_ARTICLES_MAP]: (state, map) => state.articlesMap = map,
    [SET_CATEGORIES]: (state, categories) => state.categories = categories,
    [CLEAR_ARTICLE]: state => state.article = { ...initArticle },
  },
  actions: {
    // 获取 文章 map
    [FETCH_ARTICLES_MAP]: async ctx => {
      const { data } = await getArticles();
      const mapArray = data.reduce((map, info) => [...map, [info.title, info]], []);
      ctx.commit(SET_ARTICLES_MAP, new Map(mapArray));
    },
    // 获取文章内容
    [FETCH_ARTICLE]: async (ctx, title) => {
      const article = ctx.state.articlesMap.get(title);
      if (article == null) { return false; }
      const { data } = await getArticle(article.id);
      ctx.commit(SET_ARTICLE, data);
      return true;
    },
    // 获取 categories
    [FETCH_CATEGORIES]: async ctx => {
      const { data } = await getCategories();
      ctx.commit(SET_CATEGORIES, data);
    },
    // 获取 tags
    [FETCH_TAGS]: async ctx => {
      const { data } = await getTags();
      ctx.commit(SET_TAGS, data);
    },
    // 获取 siteInfo
    [FETCH_SITE_INFO]: async ctx => {
      const { data } = await getSiteInfo();
      ctx.commit(SET_SITE_INFO, data);
    }
  }
});

window.store = store

export default store