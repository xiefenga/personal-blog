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

const useArticle = () => useSelector(state => state.article);

const useClearArticle = () => {
  const dispatch = useDispatch();
  return useCallback(
    () => dispatch(clearArticleAction()),
    [dispatch]
  );
}

function useMarkdown() {
  const { content = '' } = useSelector(state => state.article);
  const dispatch = useDispatch();
  const updateMarkdown = useCallback(
    value => dispatch(setArticleAction({ content: value })),
    [dispatch]
  );
  return [content, updateMarkdown];
}

function useTitle() {
  const { title = '' } = useSelector(state => state.article);
  const dispatch = useDispatch();
  const updateTitle = useCallback(
    value => dispatch(setArticleAction({ title: value })),
    [dispatch]
  );
  return [title, updateTitle];
}

function useArticleCategories() {
  const { categories = [] } = useSelector(state => state.article);
  const dispatch = useDispatch();
  const updateTitle = useCallback(
    value => dispatch(setArticleAction({ categories: value })),
    [dispatch]
  );
  return [categories, updateTitle];
}

function useArticleTags() {
  const { tags = [] } = useSelector(state => state.article);
  const dispatch = useDispatch();
  const updateTitle = useCallback(
    value => dispatch(setArticleAction({ tags: value })),
    [dispatch]
  );
  return [tags, updateTitle];
}

export { useArticle, useClearArticle, useMarkdown, useTitle, useArticleCategories, useArticleTags }

function useTags() {
  const tags = useSelector(state => state.tags);
  const dispatch = useDispatch();
  const updateTags = useCallback(
    value => dispatch(setTagsAction(value)),
    [dispatch]
  );
  return [tags, updateTags];
}

function useCategories() {
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

  useTags,
  useLogin,
  useLogout,
  useGetTags,
  useAddTag,
  useUpdateTag,
  useDeleteTag,
  useCategories,
  useGetCategories,
  useAddCategory,
  useUpdateCategory,
  useDeleteCategory
}