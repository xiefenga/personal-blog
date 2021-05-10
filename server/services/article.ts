// import { ArticleModel } from "../db"
// import { IArticle } from "../db/types"
// import Article from "../entities/Article"
// import { plainToClass } from "class-transformer"
// import validateModel from "../validate/validateModel"
// import { checkTagExist } from "../validate/validateTag"
// import { validatePage } from "../validate/validatePage"
// import { checkCategoriesCorrect } from "../validate/validateCategory"


import ArticleModel from '../models/Article'
import ArticleEntity from '../db/entities/Article'
import { plainTransform } from '../utils/transform'
import { validateModel } from '../validation/handleErrors'
import { wordCounts } from '../utils/markdown'
import ArticleCagtegories from '../db/entities/ArticleCategories'
import CategoryEntity from '../db/entities/Category'


/**
 * 新增文章，成功返回新添加的信息，失败返回错误消息
 * @param articleObj 添加的文章信息
 */
const addArticle = async (articleObj: Object): Promise<string[] | ArticleModel> => {
  const article = plainTransform(ArticleModel, articleObj);
  article.words = wordCounts(article.content);
  // 检测数据应当具有的字段和类型
  const errors = await validateModel(article);
  if (errors.length) { return errors; }
  // 检测文章对应的类目是否存在以及父子类目关系是否正确
  // 检测文章对应的标签是否存在


  // // ArticleCagtegories.find
  const res = await ArticleEntity.create(article);
  console.log(res)
  // const correct = await Promise.all([checkCategoriesCorrect(article.categories), checkTagExist(article.tags)]);
  // (!correct[0]) && errors.push('文章类目有误');
  // (!correct[1]) && errors.push('文章标签有误');
  // if (errors.length === 0) {
  //   try {
  //     return await ArticleModel.create(article);
  //   } catch (error) {
  //     errors.push('title已存在');
  //   }
  // }
  return errors;
}

// /**
//  * 修改文章，成功返回 true，失败返回错误消息
//  * @param id 文章id
//  * @param miniArticle 修改的文章属性
//  */
// const updateArticle = async (id: string, miniArticle: object): Promise<string[] | boolean> => {
//   const articleUpdate = plainToClass(Article, miniArticle);
//   const errors = await validateModel(articleUpdate, true);
//   if (errors.length) { return errors; }
//   // 验证 categories 和 tags
//   const errInfos = [];
//   const validates = [];
//   if (articleUpdate.categories) {
//     validates.push(checkCategoriesCorrect(articleUpdate.categories));
//     errInfos.push('文章类目有误');
//   }
//   if (articleUpdate.tags) {
//     validates.push(checkTagExist(articleUpdate.tags));
//     errInfos.push('文章标签不存在');
//   }
//   const correct = await Promise.all(validates);
//   if (correct.includes(false)) {
//     errors.push(...errInfos);
//   }
//   if (errors.length) { return errors; }
//   await ArticleModel.updateOne({ _id: id }, miniArticle);
//   return true;
// }

// /**
//  * 删除成功返回 true
//  * @param id 文章id
//  */
// const deleteArticle = async (id: string): Promise<boolean> => {
//   await ArticleModel.deleteOne({ _id: id });
//   return true;
// }

// const getArticleById = async (id: string): Promise<string | IArticle> => {
//   const article = await ArticleModel.findById(id).populate({
//     path: 'categories',
//     populate: 'topLevel twoLevel'
//   }).populate('tags');
//   return article || '不存在该文章';
// }

// /**
//  * 分页获取文章
//  * @param page 页数
//  * @param size 页容量
//  */
// const getArticles = async (page: number = 1, size: number = 10): Promise<string | [IArticle[], number]> => {
//   const error = validatePage(page, size);
//   if (typeof error === 'string') { return error; }
//   const count = await ArticleModel.find().countDocuments();
//   const articles = await ArticleModel.find().sort({ createdAt: -1 }).skip(size * (page - 1)).limit(size).populate({
//     path: 'categories',
//     populate: 'topLevel twoLevel'
//   }).populate('tags');
//   return [articles, count];
// }

// const getTopLevelArticles = async (id: string, page: number = 1, size: number = 10): Promise<string | [IArticle[], number]> => {
//   const error = validatePage(page, size);
//   if (typeof error === 'string') { return error; }
//   const count = await ArticleModel.find({ "categories.topLevel": id }).countDocuments();
//   const articles = await ArticleModel.find({ "categories.topLevel": id }).sort({ createdAt: -1 }).skip(size * (page - 1)).limit(size).populate({
//     path: 'categories',
//     populate: 'topLevel twoLevel'
//   }).populate('tags');;
//   return [articles, count];
// }

// const getTwoLevelArticles = async (topId: string, twoId: string, page: number = 1, size: number = 10): Promise<string | [IArticle[], number]> => {
//   const error = validatePage(page, size);
//   if (typeof error === 'string') { return error; }
//   const count = await ArticleModel.find({ "categories.topLevel": topId, "categories.twoLevel": twoId }).countDocuments();
//   const articles = await ArticleModel.find({ "categories.topLevel": topId, "categories.twoLevel": twoId }).sort({ createdAt: -1 }).skip(size * (page - 1)).limit(size).populate({
//     path: 'categories',
//     populate: 'topLevel twoLevel'
//   }).populate('tags');;
//   return [articles, count];
// }

// const getTagArticles = async (tagId: string, page: number = 1, size: number = 10): Promise<string | [IArticle[], number]> => {
//   const error = validatePage(page, size);
//   if (typeof error === 'string') { return error; }
//   const count = await ArticleModel.find({ 'tags': tagId }).countDocuments();
//   const articles = await ArticleModel.find({ 'tags': tagId }).sort({ createdAt: -1 }).skip(size * (page - 1)).limit(size).populate({
//     path: 'categories',
//     populate: 'topLevel twoLevel'
//   }).populate('tags');;
//   return [articles, count];
// }


// export {
//   addArticle,
//   getArticles,
//   updateArticle,
//   deleteArticle,
//   getArticleById,
//   getTopLevelArticles,
//   getTwoLevelArticles,
//   getTagArticles
// }

export { addArticle }