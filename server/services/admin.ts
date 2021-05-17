import Admin from '../models/Admin'
import { IAdmin } from '../types/models'
import { AdminConfig } from '../types/configs'
import { plainTransform } from '../utils/transform'
import { validateModel } from '../validation/handleErrors'
import { adminPath as path } from '../utils/configs'
import { writeFile } from 'fs/promises'

const login = async (loginInfo: Object): Promise<string[] | IAdmin> => {
  const admin = plainTransform(Admin, loginInfo);
  const errors = await validateModel(admin, true);
  if (errors.length) { return errors; }
  const { username, password, avatar }: AdminConfig = require(path);
  if (admin.username === username && admin.password === password) {
    return { username, avatar };
  }
  return ['用户名或密码不正确'];
}

const modify = async (userInfo: Object): Promise<string[] | boolean> => {
  const temp = plainTransform(Admin, userInfo);
  const errors = await validateModel(temp, true);
  if (errors.length) { return errors; }
  const config: AdminConfig = require(path);
  const update = plainTransform(Admin, Object.assign(config, userInfo));
  const json = JSON.stringify(update, null, 2);
  await writeFile(path, json);
  return true;
}

export { login, modify }