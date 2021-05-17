interface IArticle {
  title: string;
  content: string;
  views: number;
  words: number;
  post: string;
}

interface IArticles extends IArticle {
  categories: ICategory[][];
  tags: ITag[]
}

interface ICategory {
  name: string;
  parentId: number | null;
}

interface ICategories extends ICategory {
  children: ICategory[];
}

interface ITag {
  name: string;
}

interface IComment {
  username: string;
  content: string;
  articleId: number;
  replyId: number | null;
}


interface IAdmin {
  username: string;
  avatar: string
}


export { IArticle, IArticles, ICategory, ICategories, ITag, IComment, IAdmin }