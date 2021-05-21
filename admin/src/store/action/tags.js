import { SUCCESS_STATUS as SUCCESS } from '@/utils/constants'
import { getTags, addTag, updateTag, deleteTag } from '@/api/tag'

export const SET_TAGS = 'SET_TAGS';

export const setTagsAction = (payload) => ({
  type: SET_TAGS,
  payload
});

export const getTagsAction = () => async dispatch => {
  const { data } = await getTags();
  dispatch(setTagsAction(data));
}

export const addTagAction = value => async (dispatch, getState) => {
  const { status, data } = await addTag(value);
  if (status === SUCCESS) {
    const { tags } = getState();
    dispatch(setTagsAction([...tags, data]));
    return true;
  }
  return false;
}

export const updateTagAction = (id, value) => async (dispatch, getState) => {
  const { status, data } = await updateTag(id, value);
  if (status === SUCCESS) {
    const { tags } = getState();
    dispatch(setTagsAction(
      tags.map(tag => tag.id === id ? data : tag)
    ));
    return true;
  }
  return false;
}

export const deleteTagAction = id => async (dispatch, getState) => {
  const { status } = await deleteTag(id);
  if (status === SUCCESS) {
    const { tags } = getState();
    dispatch(setTagsAction(
      tags.filter(tag => tag.id !== id)
    ));
    return true;
  }
  return false;
}


