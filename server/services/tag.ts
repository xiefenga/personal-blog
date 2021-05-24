import TagModel from '../models/Tag'
import { ITag } from '../types/models'
import TagEntity from '../db/entities/Tag'
import { plainTransform } from '../utils/transform'
import ArticleTagsEntity from '../db/entities/ArticleTag'
import { ID_INVALID, TAG_EXISTED, TAG_NOT_EXIST } from '../utils/tips'
import { emptyModelValidate, idValidate, validateModel } from '../utils/validate'

const getTags = async (): Promise<[ITag[], number]> => {
  const { count, rows: tags } = await TagEntity.findAndCountAll();
  return [tags, count];
}

const addTag = async (value: object): Promise<ITag> => {
  const tag = plainTransform(TagModel, value);
  await validateModel(tag);
  const [t, created] = await TagEntity.findOrCreate({ where: { ...tag } });
  if (!created) {
    throw TAG_EXISTED;
  }
  return t;
}
const updateTag = async (id: number, value: Object): Promise<ITag> => {
  idValidate(id, ID_INVALID);
  const tag = plainTransform(TagModel, value);
  await validateModel(tag);
  // const res = await TagEntity.update(tag, { where: { id } });
  const ins = emptyModelValidate(
    await TagEntity.findByPk(id),
    TAG_NOT_EXIST
  );
  ins.name = tag.name;
  ins.save();
  return ins;
}

const deleteTag = async (id: number): Promise<void> => {
  idValidate(id, ID_INVALID);
  // 不能直接通过 TagEntity.destroy 直接删
  // ArticleTagsEntity 会自动删除 ForeignKey tagId 为 id 的数据
  // 需要先判断是否能删
  const { count } = await ArticleTagsEntity.findAndCountAll({
    where: {
      tagId: id
    }
  });
  if (count !== 0) {
    throw '该标签非空';
  }
  await TagEntity.destroy({
    where: {
      id
    }
  });
}

export { getTags, addTag, updateTag, deleteTag }