import TagEntity from '../db/entities/Tag'
import { ISiteInfo } from '../types/models'
import { getSiteConfig } from '../utils/helper'
import ArticleEntity from '../db/entities/Article'
import CategoryEntity from '../db/entities/Category'

export const getSiteInfo = async (): Promise<ISiteInfo> => {
  const config = getSiteConfig();
  const [articles, categories, tags] = await Promise.all([
    ArticleEntity.count(),
    CategoryEntity.count(),
    TagEntity.count()
  ]);
  return { ...config, articles, categories, tags } as ISiteInfo;
}

