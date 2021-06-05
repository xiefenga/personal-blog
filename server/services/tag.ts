import TagModel from '../models/Tag'
import { ITag } from '../types/models'
import TagEntity from '../db/entities/Tag'
import { plainTransform } from '../utils/transform'
import ArticleTagsEntity from '../db/entities/ArticleTag'
import { ID_INVALID, TAG_EXISTED, TAG_NOT_EXIST } from '../utils/tips'
import { emptyModelValidate, idValidate, validateModel } from '../utils/validate'
import { assertValidation, requireJSON } from '../utils/helper'
import { UnknowObject } from '../types/helper'
import { SiteConfig } from '../types/configs'
import { SITE_CONFIG_PATH } from '../utils/constants'
import { Op } from 'sequelize'

export const getTags = async (): Promise<[ITag[], number]> => {
  const { count, rows: tags } = await TagEntity.findAndCountAll();
  return [tags, count];
}

export const addTag = async (value: UnknowObject): Promise<ITag> => {
  const tag = plainTransform(TagModel, value);
  await validateModel(tag);
  if (!value.cover) {
    tag.cover = (requireJSON(SITE_CONFIG_PATH) as SiteConfig).defaultCover;
  }
  const [t, created] = await TagEntity.findOrCreate({ where: { ...tag } });
  assertValidation(
    !created,
    TAG_EXISTED
  );
  return t;
}
export const updateTag = async (id: number, value: Object): Promise<ITag> => {
  idValidate(id, ID_INVALID);
  const tag = plainTransform(TagModel, value);
  await validateModel(tag, true);
  const ins = emptyModelValidate(
    await TagEntity.findByPk(id),
    TAG_NOT_EXIST
  );

  const name = tag.name ?? ins.name;
  const cover = tag.cover ?? ins.cover;

  const existed = await TagEntity.findOne({
    where: {
      name,
      id: {
        [Op.ne]: id
      }
    }
  });

  assertValidation(
    !!existed,
    TAG_EXISTED
  );

  ins.name = tag.name;
  ins.cover = tag.cover ?? ins.cover;
  ins.save();
  return ins;
}

export const deleteTag = async (id: number): Promise<void> => {
  idValidate(id, ID_INVALID);
  // 不能直接通过 TagEntity.destroy 直接删
  // ArticleTagsEntity 会自动删除 ForeignKey tagId 为 id 的数据
  // 需要先判断是否能删
  const { count } = await ArticleTagsEntity.findAndCountAll({
    where: {
      tagId: id
    }
  });
  assertValidation(
    count !== 0,
    '该标签非空'
  );
  await TagEntity.destroy({
    where: {
      id
    }
  });
}
