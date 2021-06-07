import { IAdmin } from '../types/models'
import { Expose, Type } from 'class-transformer'
import { IsValidURL } from '../utils/decorators'
import { IsNotEmpty, IsString } from 'class-validator'


class Admin implements IAdmin {

  @IsString({ message: 'username类型错误' })
  @IsNotEmpty({ message: 'username不能为空' })
  @Expose()
  @Type(() => String)
  public username!: string;

  @IsString({ message: 'password类型错误' })
  @IsNotEmpty({ message: 'password不能为空' })
  @Expose()
  @Type(() => String)
  public password!: string;

  @IsString({ message: 'post类型错误' })
  @IsNotEmpty({ message: 'post不能为空' })
  @IsValidURL({ message: 'post必须为一个合法URL' })
  @Expose()
  @Type(() => String)
  public avatar!: string;

}

export default Admin