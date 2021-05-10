import { resolve } from 'path'
import Tag from './entities/Tag'
import Comment from './entities/Comment'
import Article from './entities/Article'
import Category from './entities/Category'
import ArticleTags from './entities/ArticleTags'
import ArticleCagtegories from './entities/ArticleCategories'
import { Sequelize } from 'sequelize-typescript'
import { DBConfig } from '../types/configs'
import { getConfigSync } from '../utils/getConfig'

const config: DBConfig = getConfigSync(resolve(__dirname, '../db.config.json'));

const sequelize = new Sequelize({
  ...config,
  dialect: 'mysql',
  define: { freezeTableName: true },
  models: [Article, Category, Tag, ArticleCagtegories, ArticleTags, Comment],
  logging: false
});

export default sequelize