import { join } from 'path'
import { readFileSync } from 'fs'
import { IQuote } from '../types/request'
import { ValidationError } from 'class-validator'
import { ISuccessResponse, IFailResponse } from '../types/helper'
import { AdminConfig, DBConfig, OSSConfig, SiteConfig } from '../types/configs'
import {
  FAIL,
  SUCCESS,
  ADMIN_CONFIG_FILENAME,
  ADMIN_CONFIG_PATH,
  CACHE_DIR_NAME,
  CONFIGS_DIR_NAME,
  DB_CONFIG_FILENAME,
  DB_CONFIG_PATH,
  OSS_CONFIG_FILENAME,
  OSS_CONFIG_PATH,
  QUOTE_CACHE_FILENAME,
  QUOTE_CACHE_PATH,
  SITE_CONFIG_PATH,
  SITE_CONFIG_FILENAME,
} from './constants'



export const objectToArray = <T>(object: Object): T[] => {
  const ans: T[] = [];
  for (const prop in object) {
    if (Object.prototype.hasOwnProperty.call(object, prop)) {
      ans.push((object as any)[prop]);
    }
  }
  return ans;
}


export const wordCounts = (data: string): number => {
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
export const getValidationErrors = (errs: ValidationError[]): string[] => errs.map(err => getValidationError(err)).flat();


export function createSuccessResponse(): ISuccessResponse;
export function createSuccessResponse(value: any): ISuccessResponse;
export function createSuccessResponse(value: [Object, number]): ISuccessResponse;
export function createSuccessResponse(value: any = null): ISuccessResponse {
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

export const createFailResponse = (errors: string[] | string): IFailResponse => ({
  status: FAIL,
  error: Array.isArray(errors)
    ? errors[0]
    : errors
});

export function requireJSON<T>(path: string): T {
  return JSON.parse(
    readFileSync(path, 'utf-8')
  ) as T;
}


export function getDBConfig(): DBConfig {
  try {
    return requireJSON(DB_CONFIG_PATH) as DBConfig;
  } catch (_) {
    console.error(
      '缺少配置文件:',
      join(CONFIGS_DIR_NAME, DB_CONFIG_FILENAME)
    );
    console.log('服务器启动失败');
    process.exit();
  }
}

export function getAdminConfig(): AdminConfig {
  try {
    return requireJSON(ADMIN_CONFIG_PATH) as AdminConfig;
  } catch (_) {
    throwValidateError(
      '缺少配置文件:' + join(CONFIGS_DIR_NAME, ADMIN_CONFIG_FILENAME)
    );
  }
}

export function getOSSConfig(): OSSConfig {
  try {
    return requireJSON(OSS_CONFIG_PATH) as OSSConfig;
  } catch (_) {
    throwValidateError(
      '缺少配置文件:' + join(CONFIGS_DIR_NAME, OSS_CONFIG_FILENAME)
    );
  }
}

export function getQuoteCache(): IQuote {
  try {
    return requireJSON(QUOTE_CACHE_PATH) as IQuote
  } catch (error) {
    throwValidateError(
      '缺少缓存文件:' + join(CACHE_DIR_NAME, QUOTE_CACHE_FILENAME)
    );
  }
}

export function getSiteConfig(): SiteConfig {
  try {
    return requireJSON(SITE_CONFIG_PATH) as SiteConfig
  } catch (error) {
    throwValidateError(
      '缺少配置文件:' + join(CONFIGS_DIR_NAME, SITE_CONFIG_FILENAME)
    );
  }
}


export class ValidateError extends Error { };

export function throwValidateError(message: string): never {
  throw new ValidateError(message);
}

export function assertValidation(assert: boolean, message: string) {
  if (assert) {
    throwValidateError(message);
  }
}
