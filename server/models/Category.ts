import { ICategory } from '../types/models'
import { IsValidURL } from '../utils/decorators'
import { Expose, Transform, Type } from 'class-transformer'
import { isEmpty, IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator'



class Category implements ICategory {
  @IsString({ message: 'name类型错误' })
  @IsNotEmpty({ message: 'name不能为空' })
  @Expose()
  @Type(() => String)
  public name!: string;

  @ValidateIf((_, value) => value != null)
  @IsString({ message: 'cover类型错误' })
  @IsNotEmpty({ message: 'cover不能为空' })
  @IsValidURL({ message: 'cover必须为一个合法URL' })
  @Expose()
  @Type(() => String)
  public cover!: string;

  @ValidateIf((_, value) => value != null)
  @IsInt({ message: 'parentId类型错误' })
  @Expose()
  @Transform(({ value }) => isEmpty(value) ? null : Number(value), { toClassOnly: true })
  public parentId!: number | null;
}

export default Category