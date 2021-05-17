import Tag from './entities/Tag'
import Comment from './entities/Comment'
import Article from './entities/Article'
import Category from './entities/Category'
import ArticleTags from './entities/ArticleTags'
import ArticleCagtegories from './entities/ArticleCategories'
import { Sequelize } from 'sequelize-typescript'
import { dbConfigs as configs } from '../utils/configs'

const sequelize = new Sequelize({
  ...configs,
  dialect: 'mysql',
  define: { freezeTableName: true },  // 让数据库的表名和class名相同
  models: [Article, Category, Tag, ArticleCagtegories, ArticleTags, Comment],
  logging: false
});

export default sequelize