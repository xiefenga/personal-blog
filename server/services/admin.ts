import { writeFile } from 'fs/promises'
import AdminModel from '../models/Admin'
import { IAdmin } from '../types/models'
import { UnknowObject } from '../types/helper'
import { getAdminConfig, throwValidateError } from '../utils/helper'
import { plainTransform } from '../utils/transform'
import { ADMIN_CONFIG_PATH } from '../utils/constants'
import { loginValidate, validateModel } from '../utils/validate'


const login = async (loginInfo: UnknowObject): Promise<IAdmin> => {
  const admin = plainTransform(AdminModel, loginInfo);
  await validateModel(admin, true);
  const config = getAdminConfig();
  loginValidate(config, admin);
  const { username, avatar } = config;
  return { username, avatar };
}

const updateAdmin = async (userInfo: UnknowObject): Promise<void> => {
  const temp = plainTransform(AdminModel, userInfo);
  validateModel(temp, true);
  const config = getAdminConfig();
  const update = plainTransform(
    AdminModel,
    Object.assign({}, config, userInfo)
  );
  try {
    await writeFile(
      ADMIN_CONFIG_PATH,
      JSON.stringify(update, null, 2)
    );
  } catch (_) {
    throwValidateError('修改失败，请重试');
  }
}

export { login, updateAdmin }