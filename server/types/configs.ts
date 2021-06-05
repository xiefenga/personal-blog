export interface DBConfig {
  database: string;
  username: string;
  password: string;
}

export interface AdminConfig {
  username: string;
  password: string;
  avatar: string;
}

export interface OSSConfig {
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  bucket: string;
  path: string
  customUrl?: string;
}

export interface SiteConfig {
  author: string;
  github: string;
  mail: string;
  avatar: string;
  siteName: string;
  aboutMe: string;
  beian: string;
  defaultCover: string;
}