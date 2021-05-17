import { resolve } from 'path'
import { readFileSync } from 'fs'
import { DBConfig } from '../types/configs'

export const configDir = resolve(__dirname, '../configs');

export const dbPath = resolve(configDir, 'db.config.json');

export const adminPath = resolve(configDir, 'admin.config.json');

export const secretPath = resolve(configDir, 'secret.pub');

export const staticPath = resolve(resolve(__dirname, '../public'));

export const dbConfigs: DBConfig = require(dbPath);

export const jwtSecret: string = readFileSync(secretPath, 'utf8');

export const exculdeTimeStame = {
  attributes: {
    exclude: [
      'createdAt',
      'updatedAt'
    ]
  }
};

export const jwtIgnore = {
  method: 'GET',
  path: ['/api/admin']
};


