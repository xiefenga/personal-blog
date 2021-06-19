import { useMemo } from 'react'
import { useStore } from '@/store'
import { STATE_NAME as TAGS_STATE_NAME } from '@/store/tags'
import { STATE_NAME as ADMIN_STATE_NAME } from '@/store/admin'
import { STATE_NAME as SITE_INFO_STATE_NAME } from '@/store/site'
import { STATE_NAME as ARTICLE_STATE_NAME } from '@/store/article'
import { STATE_NAME as CATEGORIES_STATE_NAME } from '@/store/categories'


export const useStoreState = (STATE_NAME) => {
  const store = useStore();
  return useMemo(() => store[STATE_NAME], [store, STATE_NAME]);
}

// admin

const useStoreAdmin = () => useStoreState(ADMIN_STATE_NAME);

export const useAdmin = () => {
  const { admin } = useStoreAdmin();
  return admin;
}

export const useLogin = () => {
  const { login } = useStoreAdmin();
  return login;
}

export const useLogout = () => {
  const { logout } = useStoreAdmin();
  return logout;
}

export const useAuth = () => {
  const { auth } = useStoreAdmin();
  return auth;
}

// article 相关

const useStoreArticle = () => useStoreState(ARTICLE_STATE_NAME);

export const useArticle = () => {
  const { article } = useStoreArticle();
  return article;
}

export const useGetArticle = () => {
  const { getArticle } = useStoreArticle();
  return getArticle;
}

export const useClearArticle = () => {
  const { clearArticle } = useStoreArticle();
  return clearArticle;
}

export const useMarkdown = () => {
  const {
    article: { content = "" },
    setContent
  } = useStoreArticle();
  return [content, setContent];
}

export const useTitle = () => {
  const {
    article: { title = "" },
    setTitle
  } = useStoreArticle();
  return [title, setTitle];
}

export const useCover = () => {
  const {
    article: { cover = "" },
    setCover
  } = useStoreArticle();
  return [cover, setCover];
}

export const useArticleCategories = () => {
  const {
    article: { categories = [] },
    setCategories
  } = useStoreArticle();
  return [categories, setCategories];
}

export const useArticleTags = () => {
  const {
    article: { tags = [] },
    setTags
  } = useStoreArticle();
  return [tags, setTags];
}

const useStoreTags = () => useStoreState(TAGS_STATE_NAME);

export const useTags = () => {
  const { tags } = useStoreTags();
  return tags;
}

export const useGetTags = () => {
  const { getTags } = useStoreTags();
  return getTags;
}

export const useAddTag = () => {
  const { addTag } = useStoreTags();
  return addTag;
}

export const useUpdateTag = () => {
  const { updateTag } = useStoreTags();
  return updateTag;
}

export const useDeleteTag = () => {
  const { deleteTag } = useStoreTags();
  return deleteTag;
}

const useStoreCategories = () => useStoreState(CATEGORIES_STATE_NAME);

export const useCategories = () => {
  const { categories } = useStoreCategories();
  return categories;
}


export const useGetCategories = () => {
  const { getCategories } = useStoreCategories();
  return getCategories;
}

export const useAddCategory = () => {
  const { addCategory } = useStoreCategories();
  return addCategory;
}

export const useUpdateCategory = () => {
  const { updateCategory } = useStoreCategories();
  return updateCategory;
}

export const useDeleteCategory = () => {
  const { deleteCategory } = useStoreCategories();
  return deleteCategory;
}


const useStoreSiteInfo = () => useStoreState(SITE_INFO_STATE_NAME);


export const useSiteInfo = () => {
  const { siteInfo } = useStoreSiteInfo();
  return siteInfo;
}

export const useGetSiteInfo = () => {
  const { getSiteInfo } = useStoreSiteInfo();
  return getSiteInfo;
}

export const useUpdateSiteInfo = () => {
  const { updateSiteInfo } = useStoreSiteInfo();
  return updateSiteInfo;
}