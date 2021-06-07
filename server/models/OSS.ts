import { IOSS } from '../types/models'

class OSS implements IOSS {

  public region!: string;
  public accessKeyId!: string;
  public accessKeySecret!: string;
  public bucket!: string;
  public path!: string;
  public customUrl?: string | undefined;

}


export default OSS