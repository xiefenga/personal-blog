import { ITag } from '../types/models'
import { Expose, Type } from 'class-transformer'
import { IsValidURL } from '../utils/decorators'
import { requireDefaultCover } from '../utils/helper'
import { IsNotEmpty, IsString } from 'class-validator'


class Tag implements ITag {

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
}

export default Tag