import Article from './Article'
import Category from './Category'
import { Table, Model, Column, ForeignKey } from 'sequelize-typescript'


@Table({ timestamps: true })
class ArticleCagtegory extends Model {
  @ForeignKey(() => Article)
  @Column
  public articleId!: number

  @ForeignKey(() => Category)
  @Column
  public categoryId!: number
}

export default ArticleCagtegory

