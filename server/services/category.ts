import CategoryModel from '../models/Category'
import { plainTransform } from '../utils/transform'
import CategoryEntity from '../db/entities/Category'
import { validateModel } from '../validation/handleErrors'
import { ICategories, ICategory } from '../types/models'

const addCategory = async (categoryObj: Object): Promise<string[] | ICategory> => {
  const category = plainTransform(CategoryModel, categoryObj);
  console.log(category);
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

// const addTwoLevelCategory = async (categoryObj: object): Promise<string[] | ITwoLevelCategory> => {
//   const category = plainToClass(TwoLevelCategory, categoryObj);
//   const errors = await validateModel(category);
//   if (errors.length) { return errors; }
//   // 检测 category 的关系问题
//   const parent = await TopLevelCategoryModel.findById(category.parent);
//   if (parent) {
//     const exist = await checkTwoLevelCategoryExist(category.categoryName, category.parent);
//     if (exist) {
//       errors.push('category已存在');
//     } else {
//       return await TwoLevelCategoryModel.create(category);
//     }
//   } else {
//     errors.push('parent category不存在');
//   }
//   return errors;
// }

// const getTopLevelCategory = async (id: string): Promise<string | ITopLevelCategory> => {
//   const category = await TopLevelCategoryModel.findById(id);
//   return category || '该类目不存在';
// }

// const getTwoLevelCategory = async (id: string): Promise<string | ITwoLevelCategory> => {
//   const category = await TwoLevelCategoryModel.findById(id);
//   return category || '该类目不存在';
// }

// const getCategories = async (): Promise<ICategory[]> => {
//   const topLevels = await TopLevelCategoryModel.find();
//   const categories = await Promise.all(topLevels.map(async parent => ({
//     topLevel: parent,
//     twoLevels: await TwoLevelCategoryModel.find({ parent: parent._id }, { parent: 0 })
//   })));
//   return categories;
// }

// const updateTopLevelCategory = async (id: string, update: object): Promise<string[] | boolean> => {
//   const topLevel = plainToClass(TopLevelCategory, update);
//   const errors = await validateModel(topLevel);
//   if (errors.length) { return errors };
//   const topLevelInfo = await TopLevelCategoryModel.findById(id);
//   if (topLevelInfo) {
//     try {
//       topLevelInfo.categoryName = topLevel.categoryName;
//       await topLevelInfo.save();
//     } catch (error) {
//       return ['category已存在'];
//     }
//   }
//   return true;
// }

// const updateTwoLevelCategory = async (id: string, update: object): Promise<string[] | boolean> => {
//   const twoLevel = plainToClass(TwoLevelCategory, update);
//   if (twoLevel.parent) { return ['不允许修改parent类目']; }
//   if (!twoLevel.categoryName) { return ['categoryNmae为空']; }
//   const errors = await validateModel(twoLevel, true);
//   if (errors.length) { return errors };
//   const twoLevelInfo = await TwoLevelCategoryModel.findById(id);
//   if (twoLevelInfo) {
//     if (twoLevelInfo.categoryName === twoLevel.categoryName) {
//       return true;
//     }
//     const exists = await checkTwoLevelCategoryExist(twoLevel.categoryName, twoLevelInfo.parent)
//     if (exists) { return ['category已存在']; }
//     twoLevelInfo.categoryName = twoLevel.categoryName;
//     await twoLevelInfo.save();
//   }
//   return true;
// }

// const deleteTopLevelCategory = async (id: string): Promise<string | boolean> => {
//   const count = await ArticleModel.find({ 'categories.topLevel': id }).countDocuments();
//   if (count) { return '非空category无法删除'; }
//   await TwoLevelCategoryModel.deleteMany({ parent: id });
//   await TopLevelCategoryModel.deleteOne({ _id: id });
//   return true;
// }

// const deleteTwoLevelCategory = async (id: string): Promise<string | boolean> => {
//   const count = await ArticleModel.find({ 'categories.twoLevel': id }).countDocuments();
//   if (count) { return '非空category无法删除'; }
//   await TwoLevelCategoryModel.deleteOne({ _id: id });
//   return true;
// }

// export {
//   getCategories,
//   addTopLevelCategory,
//   addTwoLevelCategory,
//   getTopLevelCategory,
//   getTwoLevelCategory,
//   updateTopLevelCategory,
//   updateTwoLevelCategory,
//   deleteTopLevelCategory,
//   deleteTwoLevelCategory
// }

export { addCategory, getCategories }