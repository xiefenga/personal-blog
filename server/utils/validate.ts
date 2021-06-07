import jwt from 'jsonwebtoken'
import Admin from '../models/Admin'
import { Op, Model } from 'sequelize'
import { JWT_SECRET } from './constants'
import TagEntity from '../db/entities/Tag'
import { IDENTITY_OVERDUE } from './tips'
import { AdminConfig } from '../types/configs'
import { IAdmin, IModel } from '../types/models'
import CategoryEntity from '../db/entities/Category'
import { isInt, isPositive, validate } from 'class-validator'
import { assertValidation, getValidationErrors, throwValidateError } from './helper'



export function positiveIntValidate(value: number, message: string): void {
  assertValidation(
    !isPositive(value) || !isInt(value),
    message
  );
}

export function idValidate(id: number, message: string): void {
  assertValidation(
    !isInt(id),
    message
  );
}

export function emptyModelValidate<T extends Model>(model: T | null, message: string): T {
  assertValidation(
    model === null,
    message
  );
  return model!;
}

export async function categoriesValidate(categories: number[]): Promise<CategoryEntity[]> {
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

export async function tagsValidate(tags: number[]): Promise<TagEntity[]> {
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

export function removeInvalidCId(categories: number[], cs: CategoryEntity[]) {
  for (const { parentId } of cs) {
    if (parentId !== null) {
      const index = categories.indexOf(parentId);
      if (index !== -1) {
        categories.splice(index, 1);
      }
    }
  }
}

export async function validateModel<T extends IModel>(model: T, skip: boolean = false) {
  const errors = getValidationErrors(
    await validate(
      model,
      { skipUndefinedProperties: skip }
    )
  );
  if (errors.length) { throw errors; }
}

export function loginValidate(config: AdminConfig, modal: Admin) {
  const { username, password } = config;
  assertValidation(
    modal.username !== username || modal.password !== password,
    '账号 / 密码错误'
  );
}

export function validateJWT(token?: string) {
  if (token) {
    try {
      return jwt.verify(token, JWT_SECRET) as IAdmin;
    } catch (_) {
      throwValidateError(IDENTITY_OVERDUE);
    }
  }
  throwValidateError(IDENTITY_OVERDUE);
}

export async function categoryParentIdValidate(parentId: number | null) {
  // 需要使用 != null 来判断，parentId 可能传递为 0
  if (parentId !== null) {
    const p = await CategoryEntity.findByPk(parentId);
    assertValidation(p === null, '父类目不存在');
    // p !== null 
    assertValidation(p!.parentId !== null, '只支持二级类目');
  }
}
