import { findCategoryIndex } from '@/utils/helper'
import { SUCCESS_STATUS as SUCCESS } from '@/utils/constants'
import { getCategories, addCategory, updateCategory, deleteCategory } from '@/api/category'

export const SET_CATEGORIES = 'SET_CATEGORIES';

export const setCategoriesAction = (payload) => ({
  type: SET_CATEGORIES,
  payload
});

export const getCategoriesAction = () => async dispatch => {
  const { status, data } = await getCategories();
  if (status === SUCCESS) {
    dispatch(setCategoriesAction(data));
  }
}

export const addCategoryAction = value => async (dispatch, getState) => {
  const { status, data } = await addCategory(value);
  if (status === SUCCESS) {
    const { categories } = getState();
    if (!data.parentId) {
      categories.push(data);
    } else {
      categories.forEach(c => {
        if (data.parentId === c.id) {
          c.children.push(data);
        }
      });
    }
    dispatch(setCategoriesAction(categories));
    return true;
  }
  return false;
}

export const updateCategoryAction = (id, value) => async (dispatch, getState) => {
  const { status, data } = await updateCategory(id, value);
  if (status === SUCCESS) {
    const { categories } = getState();
    const [i, j] = findCategoryIndex(id, categories);
    // 原本的数据是二级类目
    if (j !== undefined) {
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
    dispatch(setCategoriesAction(categories));
    return true;
  }
  return false;
}


export const deleteCategoryAction = id => async (dispatch, getState) => {
  const { status } = await deleteCategory(id);
  if (status === SUCCESS) {
    const { categories } = getState();
    const [i, j] = findCategoryIndex(id, categories);
    if (j !== undefined) {
      categories[i].children.splice(j, 1);
    } else {
      categories.splice(i, 1);
    }
    dispatch(setCategoriesAction(categories));
    return true;
  }
  return false;
}





