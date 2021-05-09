import { IsValidURL } from '../validation/url'
import { DyadicArray } from '../validation/arrary'
import { Expose, Type, Exclude } from 'class-transformer'
import { IsInt, IsNotEmpty, IsString, Min, ValidateIf } from 'class-validator'

class Article {
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

  @ValidateIf((_, value) => value !== undefined)
  @IsInt({ message: 'words类型错误' })
  @Min(0, { message: 'words不能为负数' })
  @Expose()
  public words!: number;

  @IsString({ message: 'post类型错误' })
  @IsNotEmpty({ message: 'post不能为空' })
  @IsValidURL({ message: 'post必须为一个合法URL' })
  @Expose()
  @Type(() => String)
  public post!: string;

  @DyadicArray(() => Number, 1, 2, { message: 'categories类型错误' })
  @Type(() => Number)
  @Expose()
  public categories!: number[][];

  @DyadicArray(() => Number, 1, 2, { message: 'tags类型错误' })
  @Type(() => Number)
  @Expose()
  public tags!: number[][];
}

export default Article;