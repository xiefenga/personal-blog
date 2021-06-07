import { ISiteInfo } from '../types/models'
import { IsValidURL } from '../utils/decorators'
import { Expose, Type } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator'


class SiteInfo implements ISiteInfo {

  @IsString({ message: 'author类型错误' })
  @IsNotEmpty({ message: 'author不能为空' })
  @Expose()
  @Type(() => String)
  public author!: string;

  @IsString({ message: 'github类型错误' })
  @IsNotEmpty({ message: 'github不能为空' })
  @IsUrl(undefined, { message: 'github类型错误' })
  @Expose()
  @Type(() => String)
  public github!: string;

  @IsString({ message: 'mail类型错误' })
  @IsNotEmpty({ message: 'mail不能为空' })
  @IsEmail(undefined, { message: 'mail类型错误' })
  @Expose()
  @Type(() => String)
  public mail!: string;


  @IsString({ message: 'avatar类型错误' })
  @IsNotEmpty({ message: 'avatar不能为空' })
  @IsValidURL({ message: 'avatar类型错误' })
  @Expose()
  @Type(() => String)
  public avatar!: string;


  @IsString({ message: 'siteName类型错误' })
  @IsNotEmpty({ message: 'siteName不能为空' })
  @Expose()
  @Type(() => String)
  public siteName!: string;

  @IsString({ message: 'aboutMe类型错误' })
  @IsNotEmpty({ message: 'aboutMe不能为空' })
  @Expose()
  @Type(() => String)
  public aboutMe!: string;

  @IsString({ message: 'beian类型错误' })
  @IsNotEmpty({ message: 'beian不能为空' })
  @Expose()
  @Type(() => String)
  public beian!: string;

  @IsString({ message: 'defaultCover类型错误' })
  @IsNotEmpty({ message: 'defaultCover不能为空' })
  @IsValidURL({ message: 'defaultCover类型错误' })
  @Expose()
  @Type(() => String)
  public defaultCover!: string;
}

export default SiteInfo;