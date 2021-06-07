import jwt from 'jsonwebtoken'
import Admin from '../models/Admin'
import { Op, Model } from 'sequelize'
import { JWT_SECRET } from './constants'
import Category from '../models/Category'
import TagEntity from '../db/entities/Tag'
import { AdminConfig } from '../types/configs'
import { IAdmin, IModel } from '../types/models'
import ArticleEntity from '../db/entities/Article'
import CategoryEntity from '../db/entities/Category'
import { ARTICLE_EXISTED, IDENTITY_OVERDUE } from './tips'
import { isInt, isPositive, validate } from 'class-validator'
import { assertValidation, getValidationErrors, throwValidateError } from './helper'



function positiveIntValidate(value: number, message: string): void {
  assertValidation(
    !isPositive(value) || !isInt(value),
    message
  );
}

function idValidate(id: number, message: string): void {
  assertValidation(
    !isInt(id),
    message
  );
}

function emptyModelValidate<T extends Model>(model: T | null, message: string): T {
  assertValidation(
    model === null,
    message
  );
  return model!;
}

async function categoriesValidate(categories: number[]): Promise<CategoryEntity[]> {
  const { rows, count } = await CategoryEntity.findAndCountAll({
    where: {
      id: {
        [Op.in]: categories
      }
    }
  });
  assertValidation(
    count === 0 || count !== categories.length,
    'categories字段有误'
  );
  return rows;
}

async function tagsValidate(tags: number[]): Promise<TagEntity[]> {
  const { rows, count } = await TagEntity.findAndCountAll({
    where: {
      id: {
        [Op.in]: tags
      }
    }
  });
  assertValidation(
    count === 0 || count !== tags.length,
    'tags字段有误'
  );
  return rows;
}

function removeInvalidCId(categories: number[], cs: CategoryEntity[]) {
  for (const { parentId } of cs) {
    if (parentId !== null) {
      const index = categories.indexOf(parentId);
      if (index !== -1) {
        categories.splice(index, 1);
      }
    }
  }
}

async function validateModel<T extends IModel>(model: T, skip: boolean = false) {
  const errors = getValidationErrors(
    await validate(
      model,
      { skipUndefinedProperties: skip }
    )
  );
  if (errors.length) { throw errors; }
}

function loginValidate(config: AdminConfig, modal: Admin) {
  const { username, password } = config;
  assertValidation(
    modal.username !== username || modal.password !== password,
    '账号 / 密码错误'
  );
}

function validateJWT(token?: string) {
  if (token) {
    try {
      return jwt.verify(token, JWT_SECRET) as IAdmin;
    } catch (_) {
      throwValidateError(IDENTITY_OVERDUE);
    }
  }
  throwValidateError(IDENTITY_OVERDUE);
}

async function validateTitleSafe(id: number, title: string) {
  const existed = await ArticleEntity.findOne({
    where: {
      title,
      id: {
        [Op.ne]: id
      }
    }
  });
  assertValidation(!!existed, ARTICLE_EXISTED);
}

async function categoryParentIdValidate(category: Category) {
  const { parentId = null } = category;
  // 需要使用 != null 来判断，parentId 可能传递为 0
  if (parentId !== null) {
    const p = await CategoryEntity.findByPk(parentId);
    assertValidation(p === null, '父类目不存在');
    assertValidation(p!.parentId !== null, '只支持二级类目');
  }
}

export {
  positiveIntValidate,
  idValidate,
  emptyModelValidate,
  categoriesValidate,
  tagsValidate,
  removeInvalidCId,
  validateModel,
  loginValidate,
  validateJWT,
  validateTitleSafe,
  categoryParentIdValidate
}