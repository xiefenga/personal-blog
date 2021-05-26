interface DBConfig {
  database: string;
  username: string;
  password: string;
}

interface AdminConfig {
  username: string;
  password: string;
  avatar: string;
}

interface OSSConfig {
  "region": string;
  "accessKeyId": string;
  "accessKeySecret": string;
  "bucket": string;
  "path": string
  "customUrl"?: string;
}

export { DBConfig, AdminConfig, OSSConfig }