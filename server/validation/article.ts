import CategoryEntity from '../db/entities/Category'

async function categoriesCheck(categories: number[][]): Promise<boolean> {
  for (const [c1, c2] of categories) {
    if (!c2) {
      const c = await CategoryEntity.findByPk(c1);
      if (!c) {
        return false;
      }
    } else {
      const c = await CategoryEntity.findByPk(c2);
      if (!c || c.parentId === c1) {
        return false;
      }
    }
  }
  return true;
}

async function tagsCheck(tags: number[]) {

}

export { categoriesCheck }