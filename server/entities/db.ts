import { resolve } from 'path'
import Tag from './Tag'
import Comment from './Comment'
import Article from './Article'
import Category from './Category'
import ArticleTags from './ArticleTags'
import ArticleCagtegories from './ArticleCategories'
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