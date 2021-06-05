import { UnknowObject } from '../types/helper'
import CategoryModel from '../models/Category'
import { plainTransform } from '../utils/transform'
import CategoryEntity from '../db/entities/Category'
import { ICategories, ICategory } from '../types/models'
import ArticleCagtegoriesEntity from '../db/entities/ArticleCategory'
import { CATEGORY_EXISTED, CATEGORY_NOT_EXIST, ID_INVALID } from '../utils/tips'
import { categoryParentIdValidate, emptyModelValidate, idValidate, validateModel } from '../utils/validate'
import { assertValidation, requireJSON } from '../utils/helper'
import { SITE_CONFIG_PATH } from '../utils/constants'
import { SiteConfig } from '../types/configs'
import { Op } from 'sequelize'


export const addCategory = async (value: UnknowObject): Promise<ICategory> => {
  const category = plainTransform(CategoryModel, value);
  await validateModel(category);
  await categoryParentIdValidate(category);
  // 补全可以缺失的属性 cover
  if (!value.cover) {
    category.cover = (requireJSON(SITE_CONFIG_PATH) as SiteConfig).defaultCover;
  }
  const [c, created] = await CategoryEntity.findOrCreate({
    where: { ...category }
  });
  assertValidation(
    !created,
    CATEGORY_EXISTED
  );
  return c;
}

/**
 * 返回所有的类目
 * @returns 返回的格式是 [...category-props, children: category[]]
 */
export const getCategories = async (): Promise<[ICategories[], number]> => {
  const { rows, count } = await CategoryEntity.findAndCountAll({ where: { parentId: null } });
  const res = await Promise.all(rows.map(async row => {
    const children = await CategoryEntity.findAll({ where: { parentId: row.id } })
    return ({ ...(row.get()), children } as ICategories);
  }));
  return [res, count];
}

export const deleteCategory = async (id: number): Promise<void> => {
  idValidate(id, ID_INVALID);
  const [{ count: c1 }, { count: c2 }] = await Promise.all([
    ArticleCagtegoriesEntity.findAndCountAll({ where: { categoryId: id } }),
    CategoryEntity.findAndCountAll({ where: { parentId: id } })
  ]);
  assertValidation(
    c1 !== 0 || c2 !== 0,
    '该类目非空'
  );
  await CategoryEntity.destroy({ where: { id } });
}

export const updateCategory = async (id: number, value: Object): Promise<ICategory> => {
  idValidate(id, ID_INVALID);
  const category = plainTransform(CategoryModel, value);
  await validateModel(category, true);
  const ins = emptyModelValidate(
    await CategoryEntity.findByPk(id),
    CATEGORY_NOT_EXIST
  );

  const name = category.name ?? ins.name;
  const parentId = category.parentId === undefined
    ? ins.parentId
    : category.parentId;
  const cover = category.cover ?? ins.cover;

  if (category.parentId) {
    await categoryParentIdValidate(category);
  }
  const existed = await CategoryEntity.findOne({
    where: {
      name,
      parentId,
      id: {
        [Op.ne]: id
      }
    }
  });
  assertValidation(
    !!existed,
    CATEGORY_EXISTED
  );

  ins.name = name;
  ins.parentId = parentId;
  ins.cover = cover;
  ins.save();
  return ins;
}
