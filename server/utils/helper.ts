import { join } from 'path'
import { ValidationError } from 'class-validator'
import { AdminConfig, DBConfig, OSSConfig } from '../types/configs'
import { ISuccessResponse, IFailResponse } from '../types/helper'
import { ADMIN_CONFIG_FILENAME, ADMIN_CONFIG_PATH, CONFIGS_DIR_NAME, DB_CONFIG_FILENAME, DB_CONFIG_PATH, FAIL, OSS_CONFIG_FILENAME, OSS_CONFIG_PATH, SUCCESS } from './constants'


function objectToArray<T>(object: Object): T[] {
  const ans: T[] = [];
  for (const prop in object) {
    if (Object.prototype.hasOwnProperty.call(object, prop)) {
      ans.push((object as any)[prop]);
    }
  }
  return ans;
}


function wordCounts(data: string): number {
  const pattern = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
  const m = data.match(pattern);
  let count = 0;
  if (m === null) {
    return count;
  }
  for (let i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4e00) {
      count += m[i].length;
    } else {
      count += 1;
    }
  }
  return count;
}


function getValidationError({ constraints, children }: ValidationError): string[] {
  if (!constraints && children?.length) {
    // 处理 nested（嵌套） 情况
    return children.map(error => getValidationError(error)).flat();
  } else if (constraints) {
    return objectToArray(constraints);
  }
  return [];
}

// 获取 class-validator 验证之后的错误消息
const getValidationErrors = (errs: ValidationError[]): string[] => errs.map(err => getValidationError(err)).flat();

export { objectToArray, wordCounts, getValidationErrors }


function createSuccessResponse(): ISuccessResponse;
function createSuccessResponse(value: any): ISuccessResponse;
function createSuccessResponse(value: [Object, number]): ISuccessResponse;
function createSuccessResponse(value: any = null): ISuccessResponse {
  if (
    Array.isArray(value) &&
    value.length === 2 &&
    value[0] instanceof Object &&
    typeof value[1] === 'number'
  ) {
    return { status: SUCCESS, data: value[0], count: value[1] }
  }
  return { status: SUCCESS, data: value }
}

const createFailResponse = (errors: string[] | string): IFailResponse => ({
  status: FAIL,
  error: Array.isArray(errors)
    ? errors[0]
    : errors
});


function getDBConfig(): DBConfig {
  try {
    return require(DB_CONFIG_PATH) as DBConfig;
  } catch (_) {
    console.error(
      '缺少配置文件:',
      join(CONFIGS_DIR_NAME, DB_CONFIG_FILENAME)
    );
    console.log('服务器启动失败');
    process.exit();
  }
}

function getAdminConfig(): AdminConfig {
  try {
    return require(ADMIN_CONFIG_PATH) as AdminConfig;
  } catch (_) {
    throw new Error(
      '缺少配置文件:' + join(CONFIGS_DIR_NAME, ADMIN_CONFIG_FILENAME)
    );
  }
}

function getOSSConfig(): OSSConfig {
  try {
    return require(OSS_CONFIG_PATH) as OSSConfig;
  } catch (_) {
    throw new Error(
      '缺少配置文件:' + join(CONFIGS_DIR_NAME, OSS_CONFIG_FILENAME)
    );
  }
}

class ValidateError extends Error { };

function throwValidateError(message: string): never {
  throw new ValidateError(message);
}

function assertValidation(assert: boolean, message: string) {
  if (assert) {
    throwValidateError(message);
  }
}


export {
  createSuccessResponse,
  createFailResponse,
  getDBConfig,
  getAdminConfig,
  getOSSConfig,
  assertValidation,
  throwValidateError,
}