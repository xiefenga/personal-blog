import Tag from './Tag'
import Comment from './Comment'
import Category from './Category'
import ArticleTag from './ArticleTag'
import ArticleCagtegory from './ArticleCategory'
import { Table, Model, Column, DataType, Unique, AllowNull, BelongsToMany, HasMany, Default } from 'sequelize-typescript'
import { IArticle } from '../../types/models'


@Table({ timestamps: true })
class Article extends Model implements IArticle {

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public title!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public content!: string;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER.UNSIGNED)
  public views: number = 0;

  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  public words!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public cover!: string;

  // 下面的都是为了实现模型之间的关系，表中不存在对应的字段
  @BelongsToMany(() => Category, () => ArticleCagtegory)
  public categories!: Category[];

  @BelongsToMany(() => Tag, () => ArticleTag)
  public tags!: Tag[];

  @HasMany(() => Comment)
  public comments!: Comment[];
}

export default Article
