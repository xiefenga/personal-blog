import { SUCCESS } from '@/utils/constants'
import { findIDIndex } from '@/utils/helper'
import { useState, useCallback } from "react"
import { getCategories, addCategory, updateCategory, deleteCategory } from '@/api/category'

export const STATE_NAME = 'categories';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const get = useCallback(
    async () => {
      const { status, data } = await getCategories();
      if (status === SUCCESS) {
        setCategories(data);
      }
    },
    []
  );
  const add = useCallback(
    async (value) => {
      const { status, data } = await addCategory(value);
      if (status === SUCCESS) {
        if (!data.parentId) {
          categories.push({ ...data, children: [] });
        } else {
          categories.forEach(c => {
            if (data.parentId === c.id) {
              c.children.push(data);
            }
          });
        }
        setCategories([...categories]);
      }
      return status === SUCCESS;
    },
    [categories]
  );
  const update = useCallback(
    async (id, value) => {
      const { status, data } = await updateCategory(id, value);
      if (status === SUCCESS) {
        const [i, j] = findIDIndex(id, categories);
        // 原本的数据是二级类目
        if (j !== -1) {
          const c = categories[i].children[j];
          // 未改变父类目
          if (c.parentId === data.parentId) {
            categories[i].children[j] = data;
          } else { // 改变父类目
            categories[i].children.splice(j, 1);
            // 移动到其他类目下
            if (data.parentId) {
              categories.find(c => c.id === data.parentId).children.push(data);
            } else { // 变为一级类目
              categories.push(data);
            }
          }
        } else { // 原本的数据是一级类目
          const c = categories[i];
          // 移动到某个类目底下，成为二级类目
          if (data.parentId) {
            categories.splice(i, 1);
            categories.find(c => c.id === data.parentId).children.push({ ...c, ...data });
          } else {
            categories[i] = { ...c, ...data };
          }
        }
        setCategories([...categories]);
      }
      return status === SUCCESS;
    },
    [categories]
  );
  const del = useCallback(
    async (id) => {
      const { status } = await deleteCategory(id);
      if (status === SUCCESS) {
        const [i, j] = findIDIndex(id, categories);
        if (j !== -1) {
          categories[i].children.splice(j, 1);
        } else {
          categories.splice(i, 1);
        }
        setCategories([...categories]);
      }
      return status === SUCCESS;
    },
    [categories]
  );
  const state = {
    categories,
    addCategory: add,
    getCategories: get,
    deleteCategory: del,
    updateCategory: update
  }
  return [STATE_NAME, state];
}