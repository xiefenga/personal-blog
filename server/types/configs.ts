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

interface SiteConfig {

}

export { DBConfig, AdminConfig }