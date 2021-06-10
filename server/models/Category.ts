import { ICategory } from '../types/models'
import { IsValidURL } from '../utils/decorators'
import { requireDefaultCover } from '../utils/helper'
import { Expose, Transform, Type } from 'class-transformer'
import { isEmpty, IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator'


class Category implements ICategory {
  @IsString({ message: 'name类型错误' })
  @IsNotEmpty({ message: 'name不能为空' })
  @Expose()
  @Type(() => String)
  public name!: string;

  @IsString({ message: 'cover类型错误' })
  @IsNotEmpty({ message: 'cover不能为空' })
  @IsValidURL({ message: 'cover必须为一个合法URL' })
  @Expose()
  @Type(() => String)
  public cover: string = requireDefaultCover();

  @ValidateIf(o => o.parentId !== null)
  @IsInt({ message: 'parentId类型错误' })
  @Expose()
  //  undefined 并不会执行转换
  @Transform(({ value }) => isEmpty(value) ? null : Number(value), { toClassOnly: true })
  public parentId!: number | null;
}

export default Category