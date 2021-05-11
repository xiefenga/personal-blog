import { ITag } from '../types/models'
import { Expose, Type } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'


class Tag implements ITag {

  @IsString({ message: 'name类型错误' })
  @IsNotEmpty({ message: 'name不能为空' })
  @Expose()
  @Type(() => String)
  public name!: string;
}

export default Tag