import { ICategory } from '../types/models'
import { Expose, Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator'


class Category implements ICategory {
  @IsString({ message: 'name类型错误' })
  @IsNotEmpty({ message: 'name不能为空' })
  @Expose()
  @Type(() => String)
  public name!: string;

  @ValidateIf((_, value) => value != undefined)
  @IsInt({ message: 'parentId类型错误' })
  @Expose()
  @Type(() => Number)
  public parentId: number | null = null;
}

export default Category