import Tag from './entities/Tag'
import Comment from './entities/Comment'
import Article from './entities/Article'
import Category from './entities/Category'
import ArticleTag from './entities/ArticleTag'
import ArticleCagtegory from './entities/ArticleCategory'
import { Sequelize } from 'sequelize-typescript'
import { getDBConfig } from '../utils/helper'

const configs = getDBConfig();

const sequelize = new Sequelize({
  ...configs,
  dialect: 'mysql',
  define: { freezeTableName: true },  // 让数据库的表名和class名相同
  models: [Article, Category, Tag, ArticleCagtegory, ArticleTag, Comment],
  logging: false
});

export default sequelize