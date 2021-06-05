import Article from './Article'
import ArticleTag from './ArticleTag'
import { ITag } from '../../types/models'
import { AllowNull, BelongsToMany, Column, DataType, Model, Table, Unique } from 'sequelize-typescript'


@Table({ timestamps: true })
class Tag extends Model implements ITag {

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public cover!: string;

  // 为了实现模型之间的关系，表中不存在对应的字段
  @BelongsToMany(() => Article, () => ArticleTag)
  // 根据 sequelize-typescript 文档，为了访问的类型安全
  public articles!: Array<Article & { ArticleTags: ArticleTag }>
}

export default Tag