import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setArticleAction, clearArticleAction } from '@/store/action/article'
import { setAdminAction, loginAction, logoutAction } from '@/store/action/admin'
import { setTagsAction, getTagsAction, addTagAction, updateTagAction, deleteTagAction } from '@/store/action/tags'
import { setCategoriesAction, getCategoriesAction, addCategoryAction, updateCategoryAction, deleteCategoryAction } from '@/store/action/categories'


function useAdmin() {
  const admin = useSelector(state => state.admin);
  const dispatch = useDispatch();
  const updateAdmin = useCallback(
    info => dispatch(setAdminAction(info)),
    [dispatch]
  );
  return [admin, updateAdmin];
}

// article 相关
export const useArticle = () => {
  const article = useSelector(state => state.article);
  const dispatch = useDispatch();
  const update = useCallback(
    article => dispatch(setArticleAction({ ...article })),
    [dispatch]
  );
  return [article, update];
}

export const useClearArticle = () => {
  const dispatch = useDispatch();
  return useCallback(
    () => dispatch(clearArticleAction()),
    [dispatch]
  );
}

export const useMarkdown = () => {
  const { content = '' } = useSelector(state => state.article);
  const dispatch = useDispatch();
  const updateMarkdown = useCallback(
    value => dispatch(setArticleAction({ content: value })),
    [dispatch]
  );
  return [content, updateMarkdown];
}

export const useTitle = () => {
  const { title = '' } = useSelector(state => state.article);
  const dispatch = useDispatch();
  const updateTitle = useCallback(
    value => dispatch(setArticleAction({ title: value })),
    [dispatch]
  );
  return [title, updateTitle];
}

export const useCover = () => {
  const { cover = '' } = useSelector(state => state.article);
  const dispatch = useDispatch();
  const update = useCallback(
    value => dispatch(setArticleAction({ cover: value })),
    [dispatch]
  );
  return [cover, update];
}

export const useArticleCategories = () => {
  const { categories = [] } = useSelector(state => state.article);
  const dispatch = useDispatch();
  const update = useCallback(
    value => dispatch(setArticleAction({ categories: value })),
    [dispatch]
  );
  return [categories, update];
}

export const useArticleTags = () => {
  const { tags = [] } = useSelector(state => state.article);
  const dispatch = useDispatch();
  const update = useCallback(
    value => dispatch(setArticleAction({ tags: value })),
    [dispatch]
  );
  return [tags, update];
}


export const useTags = () => {
  const tags = useSelector(state => state.tags);
  const dispatch = useDispatch();
  const updateTags = useCallback(
    value => dispatch(setTagsAction(value)),
    [dispatch]
  );
  return [tags, updateTags];
}

export const useCategories = () => {
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const update = useCallback(
    value => dispatch(setCategoriesAction(value)),
    [dispatch]
  );
  return [categories, update];
}

function useLogin() {
  const dispatch = useDispatch();
  return useCallback(
    async values => dispatch(loginAction(values)),
    [dispatch]
  );
}

function useLogout() {
  const dispatch = useDispatch();
  return useCallback(
    () => dispatch(logoutAction()),
    [dispatch]
  );
}

function useGetTags() {
  const dispatch = useDispatch();
  return useCallback(
    async () => dispatch(getTagsAction()),
    [dispatch]
  );
}

function useAddTag() {
  const dispatch = useDispatch();
  return useCallback(
    async value => dispatch(addTagAction(value)),
    [dispatch]
  );
}

function useUpdateTag() {
  const dispatch = useDispatch();
  return useCallback(
    async (id, value) => dispatch(updateTagAction(id, value)),
    [dispatch]
  );
}

function useDeleteTag() {
  const dispatch = useDispatch();
  return useCallback(
    async id => dispatch(deleteTagAction(id)),
    [dispatch]
  );
}

function useGetCategories() {
  const dispatch = useDispatch();
  return useCallback(
    async () => dispatch(getCategoriesAction()),
    [dispatch]
  );
}

function useAddCategory() {
  const dispatch = useDispatch();
  return useCallback(
    async value => dispatch(addCategoryAction(value)),
    [dispatch]
  );
}

function useUpdateCategory() {
  const dispatch = useDispatch();
  return useCallback(
    async (id, value) => dispatch(updateCategoryAction(id, value)),
    [dispatch]
  );
}

function useDeleteCategory() {
  const dispatch = useDispatch();
  return useCallback(
    async id => dispatch(deleteCategoryAction(id)),
    [dispatch]
  );
}

export {
  useAdmin,
  useLogin,
  useLogout,
  useGetTags,
  useAddTag,
  useUpdateTag,
  useDeleteTag,
  useGetCategories,
  useAddCategory,
  useUpdateCategory,
  useDeleteCategory
}