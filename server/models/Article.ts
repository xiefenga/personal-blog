import Category from './Category'
import ArticleCagtegories from './ArticleCategories'
import { Table, Model, Column, DataType, Unique, AllowNull, BelongsToMany, HasMany } from 'sequelize-typescript'
import Comment from './Comment';

@Table({ timestamps: true })
class Article extends Model {

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public title!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public content!: string;

  @BelongsToMany(() => Category, () => ArticleCagtegories)
  public categories!: Category[]

  @HasMany(() => Comment)
  public comments!: Comment[]

  // public readonly createdAt!: Date;
  // public readonly updatedAt!: Date;
}

export default Article
