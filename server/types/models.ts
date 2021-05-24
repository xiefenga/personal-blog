interface IModel { }

interface IArticle extends IModel {
  title: string;
  content: string;
  views: number;
  words: number;
  cover: string;
}

interface IArticles extends IArticle {
  categories: ICategory[][];
  tags: ITag[]
}

interface ICategory extends IModel {
  name: string;
  parentId: number | null;
}

interface ICategories extends ICategory {
  children: ICategory[];
}

interface ITag extends IModel {
  name: string;
}

interface IComment extends IModel {
  username: string;
  content: string;
  articleId: number;
  replyId: number | null;
}


interface IAdmin extends IModel {
  username: string;
  avatar: string
}


export { IModel, IArticle, IArticles, ICategory, ICategories, ITag, IComment, IAdmin }