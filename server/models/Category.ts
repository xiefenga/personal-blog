import Article from './Article'
import ArticleCagtegories from './ArticleCategories'
import { Exclude, Expose, Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'
import { Table, Model, AllowNull, Column, DataType, Default, BelongsToMany } from 'sequelize-typescript'

@Table({ timestamps: true })
class Category extends Model {

  @IsString({ message: 'title类型错误' })
  @IsNotEmpty({ message: 'title不能为空' })
  @Expose()
  @Type(() => String)
  @AllowNull(false)
  @Column(DataType.STRING)
  public name!: string;

  @IsInt({ message: 'parentId类型错误' })
  @Expose()
  @Type(() => Number)
  @AllowNull(true)
  @Default(null)
  @Column(DataType.INTEGER.UNSIGNED)
  public parentId: number | null = null;

  @Exclude()
  @BelongsToMany(() => Article, () => ArticleCagtegories)
  // 根据 sequelize-typescript 文档，为了访问的类型安全
  public articles!: Array<Article & { ArticleCategories: ArticleCagtegories }>
}

export default Category