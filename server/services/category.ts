import CategoryModel from '../models/Category'
import { plainTransform } from '../utils/transform'
import CategoryEntity from '../db/entities/Category'
import { validateModel } from '../validation/handleErrors'
import { ICategories, ICategory } from '../types/models'
import ArticleCagtegoriesEntity from '../db/entities/ArticleCategories'

const addCategory = async (categoryObj: Object): Promise<string[] | ICategory> => {
  const category = plainTransform(CategoryModel, categoryObj);
  const errors = await validateModel(category);
  if (errors.length) { return errors; }
  const { parentId } = category;
  // 需要使用 != null 来判断，parentId 可能传递为 0
  if (parentId !== null) {
    const p = await CategoryEntity.findByPk(parentId);
    !p && errors.push('父类目不存在');
  }
  if (errors.length) { return errors; }
  const [c, created] = await CategoryEntity.findOrCreate({
    where: { ...category }
  });

  return c;
}

/**
 * 返回所有的类目
 * @returns 返回的格式是 [...category-props, children: category[]]
 */
const getCategories = async (): Promise<[ICategories[], number]> => {
  const { rows, count } = await CategoryEntity.findAndCountAll({ where: { parentId: null } });
  const res = await Promise.all(rows.map(async row => {
    const children = await CategoryEntity.findAll({ where: { parentId: row.id } })
    return ({ ...(row.get()), children } as ICategories);
  }));
  return [res, count];
}

const deleteCategory = async (id: number): Promise<string[] | boolean> => {
  if (Number.isNaN(id)) { return ['id非法'] }
  const [{ count: c1 }, { count: c2 }] = await Promise.all([
    ArticleCagtegoriesEntity.findAndCountAll({ where: { categoryId: id } }),
    CategoryEntity.findAndCountAll({ where: { parentId: id } })
  ]);
  if (c1 === 0 && c2 === 0) {
    await CategoryEntity.destroy({ where: { id } });
    return true;
  }
  return ['category非空'];
}

const updateCategory = async (id: number, categoryObj: Object): Promise<string[] | boolean> => {
  if (Number.isNaN(id)) { return ['id非法'] }
  const category = plainTransform(CategoryModel, categoryObj);
  const errors = await validateModel(category);
  if (errors.length) { return errors }
  if (category.parentId !== null) {
    const parent = await CategoryEntity.findByPk(category.parentId);
    if (parent === null) { return ['parentId不存在'] }
  }
  await CategoryEntity.update(categoryObj, { where: { id } });
  return true;
}

export { getCategories, addCategory, deleteCategory, updateCategory }