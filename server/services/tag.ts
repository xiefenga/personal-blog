import TagModel from '../models/Tag'
import { ITag } from '../types/models'
import TagEntity from '../db/entities/Tag'
import { plainTransform } from '../utils/transform'
import { validateModel } from '../validation/handleErrors'
import ArticleTagsEntity from '../db/entities/ArticleTags'

const getTags = async (): Promise<[ITag[], number]> => {
  const { count, rows: tags } = await TagEntity.findAndCountAll();
  return [tags, count];
}

const addTag = async (tagObj: object): Promise<string[] | ITag> => {
  const tag = plainTransform(TagModel, tagObj);
  const errors = await validateModel(tag);
  if (errors.length) { return errors; }
  const [t, created] = await TagEntity.findOrCreate({ where: { ...tag } });
  return t;
}

const updateTag = async (id: number, tagObj: Object): Promise<string[] | ITag> => {
  if (Number.isNaN(id)) { return ['id非法']; }
  const tag = plainTransform(TagModel, tagObj);
  const errors = await validateModel(tag);
  if (errors.length) { return errors; }
  const [, update] = await TagEntity.update(tag, { where: { id } });
  return update[0];
}

const deleteTag = async (id: number): Promise<string[] | boolean> => {
  if (Number.isNaN(id)) { return ['id非法'] };
  // 不能直接通过 TagEntity.destroy 直接删
  // ArticleTagsEntity 会自动删除 ForeignKey tagId 为 id 的数据
  const { count } = await ArticleTagsEntity.findAndCountAll({ where: { tagId: id } });
  if (count === 0) {
    await TagEntity.destroy({ where: { id } });
    return true;
  }
  return ['tag非空，无法删除'];
}

export { getTags, addTag, updateTag, deleteTag }