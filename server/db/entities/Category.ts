import Article from './Article'
import ArticleCagtegory from './ArticleCategory'
import { Table, Model, AllowNull, Column, DataType, Default, BelongsToMany } from 'sequelize-typescript'
import { ICategory } from '../../types/models'

@Table({ timestamps: true })
class Category extends Model implements ICategory {

  @AllowNull(false)
  @Column(DataType.STRING)
  public name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public cover!: string;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.INTEGER.UNSIGNED)
  public parentId!: number | null;

  // 为了实现模型之间的关系，表中不存在对应的字段
  @BelongsToMany(() => Article, () => ArticleCagtegory)
  // 根据 sequelize-typescript 文档，为了访问的类型安全
  public articles!: Array<Article & { ArticleCategories: ArticleCagtegory }>
}

export default Category