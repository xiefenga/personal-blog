import { OSSConfig, SiteConfig } from './configs'

export interface IModel { }

export interface IArticle extends IModel {
  title: string;
  content: string;
  views: number;
  words: number;
  cover: string;
}

export interface IArticles extends IArticle {
  categories: ICategory[][];
  tags: ITag[]
}

export interface ICategory extends IModel {
  name: string;
  cover: string;
  parentId: number | null;
}

export interface ICategories extends ICategory {
  children: ICategory[];
}

export interface ITag extends IModel {
  name: string;
  cover: string;
}

export interface IComment extends IModel {
  username: string;
  content: string;
  articleId: number;
  replyId: number | null;
}


export interface IAdmin extends IModel {
  username: string;
  avatar: string;
}

export interface ISiteInfo extends SiteConfig { }

export interface IOSS extends OSSConfig { }

