import { Expose, Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

class Category {
  @IsString({ message: 'title类型错误' })
  @IsNotEmpty({ message: 'title不能为空' })
  @Expose()
  @Type(() => String)
  public name!: string;

  @IsInt({ message: 'parentId类型错误' })
  @Expose()
  @Type(() => Number)
  public parentId: number | null = null;
}

export default Category