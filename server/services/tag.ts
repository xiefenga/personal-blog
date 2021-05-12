import TagModel from '../models/Tag'
import { ITag } from '../types/models'
import TagEntity from '../db/entities/Tag'
import { plainTransform } from '../utils/transform'
import { validateModel } from '../validation/handleErrors'

const addTag = async (tagObj: object): Promise<string[] | ITag> => {
  const tag = plainTransform(TagModel, tagObj);
  const errors = await validateModel(tag);
  if (errors.length) { return errors; }

  const [t, created] = await TagEntity.findOrCreate({ where: { ...tag } });

  return t;
}

export { addTag }