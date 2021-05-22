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
  const { parentId = null } = category;
  // 需要使用 != null 来判断，parentId 可能传递为 0
  if (parentId !== null) {
    const p = await CategoryEntity.findByPk(parentId);
    if (p === null) { return ['父类目不存在'] }
    if (p.parentId) { return ['只支持二级类目'] }
  }
  const [c, created] = await CategoryEntity.findOrCreate({
    where: { ...category }
  });
  return created ? c : ['该类目已存在'];
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

const updateCategory = async (id: number, categoryObj: Object): Promise<string[] | ICategory> => {
  if (Number.isNaN(id)) { return ['id非法'] }
  const category = plainTransform(CategoryModel, categoryObj);
  const errors = await validateModel(category, true);
  if (errors.length) { return errors }
  const ins = await CategoryEntity.findByPk(id);
  if (ins === null) { return ['该类目不存在'] }
  const name = category.name ?? ins.name;
  const parentId = category.parentId === undefined ? ins.parentId : category.parentId;
  if (ins.name === name && parentId === ins.parentId) {
    return ins;
  }
  if (category.parentId) {
    const p = await CategoryEntity.findByPk(category.parentId);
    if (p === null) { return ['父类目不存在'] }
    if (p.parentId) { return ['只支持二级类目'] }
  }
  const existed = await CategoryEntity.findOne({ where: { name, parentId } });
  if (existed) { return ['已存在该类目，修改失败']; }
  ins.name = name;
  ins.parentId = parentId;
  ins.save();
  return ins;
}

export { getCategories, addCategory, deleteCategory, updateCategory }