import Article from './Article'
import ArticleCagtegories from './ArticleCategories'
import { Table, Model, AllowNull, Column, DataType, Default, BelongsToMany } from 'sequelize-typescript'

@Table({ timestamps: true })
class Category extends Model {

  @AllowNull(false)
  @Column(DataType.STRING)
  public name!: string;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.INTEGER.UNSIGNED)
  public parentId: number | null = null;

  @BelongsToMany(() => Article, () => ArticleCagtegories)
  // 根据 sequelize-typescript 文档，为了访问的类型安全
  public articles!: Array<Article & { ArticleCategories: ArticleCagtegories }>
}

export default Category