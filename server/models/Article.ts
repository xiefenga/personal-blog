import { IArticle } from '../types/models'
import { Expose, Type, Exclude } from 'class-transformer'
import { IsValidURL, IsArrayOf } from '../validation/decorator'
import { IsInt, IsNotEmpty, IsString, Min, isInt, ArrayMinSize, ArrayUnique } from 'class-validator'


class Article implements IArticle {

  @IsString({ message: 'title类型错误' })
  @IsNotEmpty({ message: 'title不能为空' })
  @Expose()
  @Type(() => String)
  public title!: string;

  @IsString({ message: 'content类型错误' })
  @IsNotEmpty({ message: 'content不能为空' })
  @Expose()
  @Type(() => String)
  public content!: string;

  @IsInt({ message: 'views类型错误' })
  @Min(0, { message: 'views不能为负数' })
  @Exclude() // 阅读数应当只有服务端可以设置，如果 plain-object 中含有该字段，转换时应忽略
  public views: number = 0;

  @IsInt({ message: 'words类型错误' })
  @Min(0, { message: 'words不能为负数' })
  @Exclude()  // 文章的字数不让客户端设置，不应当相信客户端传来的数据
  public words!: number;

  @IsString({ message: 'post类型错误' })
  @IsNotEmpty({ message: 'post不能为空' })
  @IsValidURL({ message: 'post必须为一个合法URL' })
  @Expose()
  @Type(() => String)
  public post!: string;

  @IsArrayOf(isInt, { message: 'categories类型错误' })
  @ArrayMinSize(1, { message: 'categories不能为空' })
  @ArrayUnique({ message: 'categories不唯一' })
  @Type(() => Number)
  @Expose()
  public categories!: number[];

  @IsArrayOf(isInt, { message: 'tags类型错误' })
  @ArrayMinSize(1, { message: 'tags不能为空' })
  @ArrayUnique({ message: 'tags不唯一' })
  @Type(() => Number)
  @Expose()
  public tags!: number[];
}

export default Article;