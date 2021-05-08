import Tag from './Tag'
import Comment from './Comment'
import Category from './Category'
import ArticleTags from './ArticleTags'
import ArticleCagtegories from './ArticleCategories'
import { Table, Model, Column, DataType, Unique, AllowNull, BelongsToMany, HasMany } from 'sequelize-typescript'

@Table({ timestamps: true })
class Article extends Model {

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public title!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public content!: string;

  // 下面的都是为了实现模型之间的关系，表中不存在对应的字段
  @BelongsToMany(() => Category, () => ArticleCagtegories)
  public categories!: Category[];

  @BelongsToMany(() => Tag, () => ArticleTags)
  public tags!: Tag[];

  @HasMany(() => Comment)
  public comments!: Comment[];

  // public readonly createdAt!: Date;
  // public readonly updatedAt!: Date;
}

export default Article
