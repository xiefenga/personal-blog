interface IArticle {
  title: string;
  content: string;
  views: number;
  words: number;
  post: string;
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


export { IArticle, ICategory, ICategories, ITag, IComment }