import Tag from './Tag'
import Comment from './Comment'
import Category from './Category'
import ArticleTags from './ArticleTags'
import ArticleCagtegories from './ArticleCategories'
import { Exclude, Expose, Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator'
import { Table, Model, Column, DataType, Unique, AllowNull, BelongsToMany, HasMany, Default } from 'sequelize-typescript'


@Table({ timestamps: true })
class Article extends Model {

  @IsString({ message: 'title类型错误' })
  @IsNotEmpty({ message: 'title不能为空' })
  @Expose()
  @Type(() => String)
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public title!: string;

  @IsString({ message: 'content类型错误' })
  @IsNotEmpty({ message: 'content不能为空' })
  @Expose()
  @Type(() => String)
  @AllowNull(false)
  @Column(DataType.TEXT)
  public content!: string;

  @IsInt({ message: 'views类型错误' })
  @Min(0, { message: 'views不能为负数' })
  @Exclude() // 阅读数应当只有服务端可以设置，转换时应忽略
  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER.UNSIGNED)
  public views: number = 0;

  @IsInt({ message: 'words类型错误' })
  @Min(0, { message: 'words不能为负数' })
  @Expose()
  @Type(() => Number)
  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  public words!: number;

  @IsNotEmpty({ message: 'post不能为空' })
  @IsString({ message: 'post类型错误' })
  @Expose()
  @Type(() => String)
  @AllowNull(false)
  @Column(DataType.STRING)
  public post!: string;

  // 下面的都是为了实现模型之间的关系，表中不存在对应的字段
  // plain-object 转换时应当 skip 这些不存在的字段
  @Exclude()
  @BelongsToMany(() => Category, () => ArticleCagtegories)
  public categories!: Category[];

  @Exclude()
  @BelongsToMany(() => Tag, () => ArticleTags)
  public tags!: Tag[];

  @Exclude()
  @HasMany(() => Comment)
  public comments!: Comment[];
}

export default Article
