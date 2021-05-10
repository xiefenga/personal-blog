import { Expose, Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

class Comment {

  @IsString({ message: 'content类型错误' })
  @IsNotEmpty({ message: 'content不能为空' })
  @Expose()
  @Type(() => String)
  public content!: string;

  @IsInt({ message: 'articleId类型有误' })
  @Expose()
  @Type(() => Number)
  public articleId!: number;

  @IsInt({ message: 'replyId类型有误' })
  @Expose()
  @Type(() => Number)
  public replyId: number | null = null;

  @IsString({ message: 'username类型错误' })
  @IsNotEmpty({ message: 'username不能为空' })
  @Expose()
  @Type(() => String)
  public username!: string;
}

export default Comment