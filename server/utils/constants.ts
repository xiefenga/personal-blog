import { resolve } from 'path'
import { readFileSync } from 'fs'

export const STATIC_DIR_NAME = 'public';

export const CONFIGS_DIR_NAME = 'configs';

export const CACHE_DIR_NAME = 'caches';

export const DB_CONFIG_FILENAME = 'db.config.json';

export const ADMIN_CONFIG_FILENAME = 'admin.config.json';

export const SITE_CONFIG_FILENAME = 'site.config.json';

export const OSS_CONFIG_FILENAME = 'ali-oss.config.json';

export const SECRET_CONFIG_FILENAME = 'secret.pub';

export const QUOTE_CACHE_FILENAME = 'quote.json';

export const ROOT_PATH = resolve(__dirname, '../');

export const CONFIGS_DIR_PATH = resolve(ROOT_PATH, CONFIGS_DIR_NAME);

export const CACHE_DIR_PATH = resolve(ROOT_PATH, CACHE_DIR_NAME);

export const DB_CONFIG_PATH = resolve(CONFIGS_DIR_PATH, DB_CONFIG_FILENAME);

export const ADMIN_CONFIG_PATH = resolve(CONFIGS_DIR_PATH, ADMIN_CONFIG_FILENAME);

export const SECRET_CONFIG_PATH = resolve(CONFIGS_DIR_PATH, SECRET_CONFIG_FILENAME);

export const SITE_CONFIG_PATH = resolve(CONFIGS_DIR_PATH, SITE_CONFIG_FILENAME);

export const OSS_CONFIG_PATH = resolve(CONFIGS_DIR_PATH, OSS_CONFIG_FILENAME);

export const STATIC_PATH = resolve(ROOT_PATH, STATIC_DIR_NAME);

export const QUOTE_CACHE_PATH = resolve(CACHE_DIR_PATH, QUOTE_CACHE_FILENAME);

export const JWT_SECRET: string = readFileSync(SECRET_CONFIG_PATH, 'utf8');

export const SUCCESS = 'success';

export const FAIL = 'fail';

export const DAILY_TASK_TIME = '* * 8 * * *';

export const EXCLUDE_TIMESTAME = {
  attributes: {
    exclude: [
      'createdAt',
      'updatedAt'
    ]
  }
};

export const JWT_IGNORE_ROUTES = {
  method: 'GET',
  path: [/^\/api\/admin/]
};


export const QUOTE_URL = 'https://apiv3.shanbay.com/weapps/dailyquote/quote/';

