import { Op } from 'sequelize'
import { UnknowObject } from '../types/helper'
import CategoryModel from '../models/Category'
import { assertValidation } from '../utils/helper'
import { plainTransform } from '../utils/transform'
import CategoryEntity from '../db/entities/Category'
import { ICategories, ICategory } from '../types/models'
import ArticleCagtegoriesEntity from '../db/entities/ArticleCategory'
import { CATEGORY_EXISTED, CATEGORY_NOT_EXIST, ID_INVALID } from '../utils/tips'
import { categoryParentIdValidate, emptyModelValidate, idValidate, validateModel } from '../utils/validate'


export const addCategory = async (value: UnknowObject): Promise<ICategory> => {

  const category = plainTransform(CategoryModel, value);

  await validateModel(category);

  await categoryParentIdValidate(category.parentId);

  const existed = await CategoryEntity.findOne({
    where: {
      name: category.name,
      parentId: category.parentId
    }
  });

  assertValidation(
    !!existed,
    CATEGORY_EXISTED
  );

  return await CategoryEntity.create({ ...category });
}

/**
 * 返回所有的类目
 * @returns 返回的格式是 [...category-props, children: category[]]
 */
export const getCategories = async (): Promise<[ICategories[], number]> => {

  const { rows: data, count } = await CategoryEntity.findAndCountAll();

  const topLevels = data.filter(c => c.parentId === null);

  const categories = topLevels.map(
    c => ({
      ...c.get(),
      children: data.filter(c => c.parentId === c.id)
    }) as ICategories
  );

  return [categories, count];
}

export const deleteCategory = async (id: number): Promise<void> => {

  idValidate(id, ID_INVALID);

  const [{ count: c1 }, { count: c2 }] = await Promise.all([
    ArticleCagtegoriesEntity.findAndCountAll({
      where: {
        categoryId: id
      }
    }),
    CategoryEntity.findAndCountAll({
      where: {
        parentId: id
      }
    })
  ]);

  assertValidation(
    c1 !== 0 || c2 !== 0,
    '该类目非空'
  );

  await CategoryEntity.destroy({
    where: {
      id
    }
  });
}

export const updateCategory = async (id: number, value: UnknowObject): Promise<ICategory> => {

  idValidate(id, ID_INVALID);

  await validateModel(plainTransform(CategoryModel, value), true);

  const ins = emptyModelValidate(
    await CategoryEntity.findByPk(id),
    CATEGORY_NOT_EXIST
  );

  const category = plainTransform(
    CategoryModel,
    Object.assign({}, ins.get(), value)
  );

  if (value.parentId) {
    await categoryParentIdValidate(category.parentId);
  }

  if (value.name) {
    const existed = await CategoryEntity.findOne({
      where: {
        name: category.name,
        parentId: category.parentId,
        id: {
          [Op.ne]: id
        }
      }
    });

    assertValidation(
      !!existed,
      CATEGORY_EXISTED
    );
  }

  // 更新数据
  ins.update({ ...category });
  return ins;
}

