import { SUCCESS } from '@/utils/constants'
import { useState, useCallback } from "react"
import { getTags, addTag, updateTag, deleteTag } from '@/api/tag'

export const STATE_NAME = 'tags';

export const useTags = () => {
  const [tags, setTags] = useState([]);
  const get = useCallback(
    async () => {
      const { data, status } = await getTags();
      if (status === SUCCESS) {
        setTags(data);
      }
    },
    []
  );
  const add = useCallback(
    async (value) => {
      const { status, data } = await addTag(value);
      if (status === SUCCESS) {
        setTags([...tags, data]);
      }
      return status === SUCCESS;
    },
    [tags]
  );

  const update = useCallback(
    async (id, value) => {
      const { status, data } = await updateTag(id, value);
      if (status === SUCCESS) {
        setTags(
          tags.map(tag => tag.id === id ? data : tag)
        )
      }
      return status === SUCCESS;
    },
    [tags]
  );

  const del = useCallback(
    async (id) => {
      const { status } = await deleteTag(id);
      if (status === SUCCESS) {
        setTags(
          tags.filter(tag => tag.id !== id)
        );
      }
      return status === SUCCESS;
    },
    [tags]
  );

  const state = {
    tags,
    addTag: add,
    getTags: get,
    deleteTag: del,
    updateTag: update,
  };

  return [STATE_NAME, state];
}