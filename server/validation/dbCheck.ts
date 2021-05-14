import TagEntity from '../db/entities/Tag'
import CategoryEntity from '../db/entities/Category'

async function categoriesCheck(categories: number[]): Promise<[boolean, CategoryEntity[]]> {
  const res = await Promise.all(categories.map(id => CategoryEntity.findByPk(id)));
  if (res.includes(null)) {
    return [false, res.filter(c => c !== null) as CategoryEntity[]]
  }
  return [true, res as CategoryEntity[]];
}

async function tagsCheck(tags: number[]): Promise<boolean> {
  const res = await Promise.all(tags.map(id => TagEntity.findByPk(id)));
  return !res.includes(null);
}

export { categoriesCheck, tagsCheck }