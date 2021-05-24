import jwt from 'jsonwebtoken'
import Admin from '../models/Admin'
import { Op, Model } from 'sequelize'
import { JWT_SECRET } from './constants'
import Category from '../models/Category'
import TagEntity from '../db/entities/Tag'
import { getValidationErrors } from './helper'
import { AdminConfig } from '../types/configs'
import { IAdmin, IModel } from '../types/models'
import ArticleEntity from '../db/entities/Article'
import CategoryEntity from '../db/entities/Category'
import { isInt, isPositive, validate } from 'class-validator'
import { ARTICLE_EXISTED, IDENTITY_OVERDUE } from './tips'


function positiveIntValidate(value: number, message: string): void {
  if (!isPositive(value) || !isInt(value)) {
    throw message;
  }
}

function idValidate(id: number, message: string): void {
  if (!isInt(id)) {
    throw message;
  }
}

function emptyModelValidate<T extends Model>(model: T | null, message: string): T {
  if (model === null) {
    throw message;
  }
  return model;
}

async function categoriesValidate(categories: number[]): Promise<CategoryEntity[]> {
  const { rows, count } = await CategoryEntity.findAndCountAll({
    where: {
      id: {
        [Op.in]: categories
      }
    }
  });
  if (count === 0 || count !== categories.length) {
    throw 'categories字段有误';
  }
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
  if (count === 0 || count !== tags.length) {
    throw 'tags字段有误';
  }
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
  if (errors.length) {
    throw errors;
  }
  return errors;
}

function loginValidate(config: AdminConfig, modal: Admin) {
  const { username, password, avatar } = config;
  if (
    modal.username !== username ||
    modal.password !== password
  ) {
    throw '账号 / 密码错误';
  }
}

function validateJWT(token?: string) {
  if (token) {
    try {
      return jwt.verify(token, JWT_SECRET) as IAdmin;
    } catch (_) {
      throw IDENTITY_OVERDUE;
    }
  }
  throw IDENTITY_OVERDUE;
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
  if (existed) {
    throw ARTICLE_EXISTED;
  }
}

async function categoryParentIdValidate(category: Category) {
  const { parentId = null } = category;
  // 需要使用 != null 来判断，parentId 可能传递为 0
  if (parentId !== null) {
    const p = await CategoryEntity.findByPk(parentId);
    if (p === null) { throw '父类目不存在' }
    if (p.parentId) { throw '只支持二级类目' }
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