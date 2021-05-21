import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setArticleAction } from '@/store/action/article'
import { setAdminAction, loginAction, logoutAction } from '@/store/action/admin'
import { setTagsAction, getTagsAction, addTagAction, updateTagAction, deleteTagAction } from '@/store/action/tags'


function useAdmin() {
  const admin = useSelector(state => state.admin);
  const dispatch = useDispatch();
  const updateAdmin = useCallback(
    info => dispatch(setAdminAction(info)),
    [dispatch]
  );
  return [admin, updateAdmin];
}

function useMarkdown() {
  const { markdown = '' } = useSelector(state => state.article);
  const dispatch = useDispatch();
  const updateMarkdown = useCallback(
    value => dispatch(setArticleAction({ markdown: value })),
    [dispatch]
  );
  return [markdown, updateMarkdown];
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

function useTags() {
  const tags = useSelector(state => state.tags);
  const dispatch = useDispatch();
  const updateTags = useCallback(
    value => dispatch(setTagsAction(value)),
    [dispatch]
  );
  return [tags, updateTags];
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


export {
  useAdmin,
  useMarkdown,
  useTitle,
  useTags,
  useLogin,
  useLogout,
  useGetTags,
  useAddTag,
  useUpdateTag,
  useDeleteTag
}