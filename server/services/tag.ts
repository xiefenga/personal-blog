import { Op } from 'sequelize'
import TagModel from '../models/Tag'
import { ITag } from '../types/models'
import TagEntity from '../db/entities/Tag'
import { UnknowObject } from '../types/helper'
import { assertValidation } from '../utils/helper'
import { plainTransform } from '../utils/transform'
import ArticleTagsEntity from '../db/entities/ArticleTag'
import { ID_INVALID, TAG_EXISTED, TAG_NOT_EXIST } from '../utils/tips'
import { emptyModelValidate, idValidate, validateModel } from '../utils/validate'


export const getTags = async (): Promise<[ITag[], number]> => {
  const { count, rows: tags } = await TagEntity.findAndCountAll();
  return [tags, count];
}

export const addTag = async (value: UnknowObject): Promise<ITag> => {

  const tag = plainTransform(TagModel, value);

  await validateModel(tag);

  const existed = await TagEntity.findOne({
    where: {
      name: tag.name
    }
  });

  assertValidation(
    !!existed,
    TAG_EXISTED
  );

  return await TagEntity.create({ ...tag });
}


export const updateTag = async (id: number, value: UnknowObject): Promise<ITag> => {

  idValidate(id, ID_INVALID);

  await validateModel(plainTransform(TagModel, value), true);

  const ins = emptyModelValidate(
    await TagEntity.findByPk(id),
    TAG_NOT_EXIST
  );

  const tag = plainTransform(
    TagModel,
    Object.assign({}, ins.get(), value)
  );

  if (value.name) {
    const existed = await TagEntity.findOne({
      where: {
        name: tag.name,
        id: {
          [Op.ne]: id
        }
      }
    });

    assertValidation(
      !!existed,
      TAG_EXISTED
    );
  }

  // 更新数据
  return await ins.update({ ...tag });
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
