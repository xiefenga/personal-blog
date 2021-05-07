import Tag from './Tag'
import Article from './Article'
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'

@Table({ timestamps: true })
class ArticleTags extends Model {
  @ForeignKey(() => Article)
  @Column
  public articleId!: number;

  @ForeignKey(() => Tag)
  @Column
  public tagId!: number;
}

export default ArticleTags