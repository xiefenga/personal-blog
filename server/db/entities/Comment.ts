import Article from './Article'
import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, Table } from 'sequelize-typescript'
import { IComment } from '../../types/models'

@Table({ timestamps: true })
class Comment extends Model implements IComment {

  @AllowNull(false)
  @Column(DataType.STRING)
  public content!: string;

  @ForeignKey(() => Article)
  @Column
  public articleId!: number;

  @Default(null)
  @Column(DataType.INTEGER.UNSIGNED)
  public replyId!: number | null;

  @AllowNull(false)
  @Column(DataType.STRING)
  public username!: string;

  @BelongsTo(() => Article)
  public article!: Article;
}

export default Comment