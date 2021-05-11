import Article from './Article'
import ArticleTags from './ArticleTags'
import { AllowNull, BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript'
import { ITag } from '../../types/models'


@Table({ timestamps: true })
class Tag extends Model implements ITag {

  @AllowNull(false)
  @Column(DataType.STRING)
  public name!: string;

  @BelongsToMany(() => Article, () => ArticleTags)
  // 根据 sequelize-typescript 文档，为了访问的类型安全
  public articles!: Array<Article & { ArticleTags: ArticleTags }>
}

export default Tag