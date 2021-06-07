import SiteInfo from '../models/SiteInfo'
import { ISiteInfo } from '../types/models'
import { UnknowObject } from '../types/helper'
import { validateModel } from '../utils/validate'
import { plainTransform } from '../utils/transform'
import { SITE_CONFIG_PATH } from '../utils/constants'
import { getSiteConfig, throwValidateError, writeJSONFile } from '../utils/helper'


export const getSiteInfo = (): ISiteInfo => getSiteConfig();

export const updateSiteInfo = async (value: UnknowObject): Promise<ISiteInfo> => {
  const tmp = plainTransform(SiteInfo, value);
  await validateModel(tmp, true);
  const config = getSiteConfig();
  const siteInfo = plainTransform(SiteInfo, Object.assign({}, config, value));
  try {
    await writeJSONFile(
      SITE_CONFIG_PATH,
      siteInfo
    );
    return siteInfo;
  } catch (_) {
    throwValidateError('修改失败，请重试');
  }
}

