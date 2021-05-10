import Article from './Article'
import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, Table } from 'sequelize-typescript'

@Table({ timestamps: true })
class Comment extends Model {

  @AllowNull(false)
  @Column(DataType.STRING)
  public content!: string;

  @ForeignKey(() => Article)
  @Column
  public articleId!: number;

  @Default(null)
  @Column(DataType.INTEGER.UNSIGNED)
  public replyId: number | null = null;

  @AllowNull(false)
  @Column(DataType.STRING)
  public username!: string;

  @BelongsTo(() => Article)
  public article!: Article;
}

export default Comment