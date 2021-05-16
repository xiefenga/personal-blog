import ArticleModel from '../models/Article'
import ArticleEntity from '../db/entities/Article'
import { plainTransform } from '../utils/transform'
import { validateModel } from '../validation/handleErrors'
import { wordCounts } from '../utils/markdown'
import ArticleCagtegoriesEntity from '../db/entities/ArticleCategories'
import { categoriesCheck, tagsCheck } from '../validation/dbCheck'
import ArticleTagsEntity from '../db/entities/ArticleTags'
import ArticleCagtegories from '../db/entities/ArticleCategories'
import ArticleTags from '../db/entities/ArticleTags'
import { IArticle, IArticles } from '../types/models'
import CategoryEntity from '../db/entities/Category'
import TagEntity from '../db/entities/Tag'
import { Op } from 'sequelize'

const exculdeTimeStame = { attributes: { exclude: ['createdAt', 'updatedAt'] } };

// 获取归档
const getArchives = async (page: number = 1, size: number = 10): Promise<string | [IArticle[], number]> => {
  if (Number.isNaN(page) || page < 1) {
    return 'page非法';
  } else if (Number.isNaN(size) || size < 1) {
    return 'size非法';
  }
  const { rows, count } = await ArticleEntity.findAndCountAll({
    limit: size,
    offset: (page - 1) * size,
    order: [
      ['createdAt', 'DESC']
    ]
  });
  return [rows, count];
}

/**
 * 分页获取文章
 * @param page 页数
 * @param size 页容量
 */
const getArticles = async (page: number = 1, size: number = 10): Promise<string | [IArticles[], number]> => {
  if (Number.isNaN(page) || page < 1) {
    return 'page非法';
  } else if (Number.isNaN(size) || size < 1) {
    return 'size非法';
  }
  const { rows, count } = await ArticleEntity.findAndCountAll({
    limit: size,
    offset: (page - 1) * size,
    order: [
      ['createdAt', 'DESC']
    ]
  });

  const articles = await Promise.all(rows.map(article => getArticle(article.id, article) as Promise<IArticles>))

  return [articles, count];
}

const getArticle = async (id: number, article?: ArticleEntity): Promise<string | IArticles> => {
  if (Number.isNaN(id)) {
    return 'id非法';
  }

  if (!article) {
    const queryArticle = await ArticleEntity.findByPk(id);
    if (queryArticle === null) {
      return 'article不存在';
    } else {
      article = queryArticle;
    }
  }

  const [acs, ats] = await Promise.all([
    ArticleCagtegoriesEntity.findAll({ where: { articleId: id } }),
    ArticleTagsEntity.findAll({ where: { articleId: id } })
  ]);

  const cPromise = Promise.all(acs.map(async ac => {
    const c = (await CategoryEntity.findByPk(ac.categoryId, exculdeTimeStame))!;
    if (c.parentId !== null) {
      const pc = (await CategoryEntity.findByPk(c.parentId, exculdeTimeStame))!;
      return [pc, c];
    }
    return [c];
  }));

  const tPromise = Promise.all(ats.map(at => TagEntity.findByPk(at.tagId, exculdeTimeStame) as Promise<TagEntity>));

  const [categories, tags] = await Promise.all([cPromise, tPromise]);

  return { ...article.get(), categories, tags };
}

const getArticleById = async (id: number) => getArticle(id);

/**
 * 新增文章，成功返回新添加的信息，失败返回错误消息
 * @param articleObj 添加的文章信息
 */
const addArticle = async (articleObj: Object): Promise<string[] | IArticles> => {
  const article = plainTransform(ArticleModel, articleObj);
  article.words = wordCounts(article.content);
  // 检测数据应当具有的字段和类型
  const errors = await validateModel(article);
  if (errors.length) { return errors; }
  // 检测文章对应的categories和tags是否存在
  const [[res1, cs], res2] = await Promise.all([categoriesCheck(article.categories), tagsCheck(article.tags)]);
  if (!res1) {
    return ['categories数据有误'];
  } else if (!res2) {
    return ['tags数据有误']
  }
  try {
    const res = await ArticleEntity.create(article);
    const { categories, tags } = article;
    // 使得 categories 中的数据保持纯净
    for (const { parentId } of cs) {
      if (parentId !== null) {
        const index = categories.indexOf(parentId);
        if (index !== -1) {
          categories.splice(index, 1);
        }
      }
    }
    const pro1 = categories.map(id => ArticleCagtegoriesEntity.create({
      articleId: res.id,
      categoryId: id
    }));
    const pro2 = tags.map(id => ArticleTagsEntity.create({
      articleId: res.id,
      tagId: id
    }));
    const pro = Promise.all<ArticleCagtegories | ArticleTags>([...pro1, ...pro2]);
    const articlePro = getArticle(res.id, res);
    const [_, articleInfo] = await Promise.all([
      pro,
      articlePro as Promise<IArticles>
    ]);
    return articleInfo;
  } catch (error) {
    errors.push('添加失败, 请确保文章名唯一');
  }
  return errors;
}

const updateArticle = async (id: number, miniArticle: Object): Promise<string[] | IArticles> => {
  if (Number.isNaN(id)) {
    return ['id非法'];
  }
  const article = await ArticleEntity.findByPk(id);
  if (article === null) {
    return ['article不存在'];
  }
  const articleUpdate = plainTransform(ArticleModel, miniArticle);
  const errors = await validateModel(articleUpdate, true);
  if (errors.length) { return errors; }
  const { categories, tags } = articleUpdate;
  if (categories) {
    const [res, cs] = await categoriesCheck(categories);
    if (!res) {
      return ['categories有误'];
    }
    for (const { parentId } of cs) {
      if (parentId !== null) {
        const index = categories.indexOf(parentId);
        if (index !== -1) {
          categories.splice(index, 1);
        }
      }
    }

    await Promise.all([
      ArticleCagtegoriesEntity.destroy({
        where: {
          categoryId: { [Op.notIn]: categories }
        }
      }),
      ArticleCagtegoriesEntity.findOrCreate({
        where: {
          categoryId: { [Op.in]: categories }
        }
      })
    ])
  }
  if (tags) {
    const res = await tagsCheck(tags);
    if (!res) {
      return ['tags有误'];
    }
    await Promise.all([
      ArticleTagsEntity.destroy({ where: { [Op.notIn]: tags } }),
      ArticleTagsEntity.findOrCreate({ where: { [Op.in]: tags } })
    ]);
  }
  const { content, post } = articleUpdate;
  if (content) {
    article.content = content;
    article.words = wordCounts(content);
  }
  if (post) { article.post = post; }
  article.save();
  return await getArticle(id, article) as IArticles;
}


const deleteArticle = async (id: number): Promise<void> => {
  if (Number.isNaN(id)) { return; }
  await ArticleEntity.destroy({ where: { id } });
  // ArticleCategories 和 ArticleTags 会自动删除
}


const getArticlesByCategoryId = async (id: number): Promise<string | [IArticles[], number]> => {
  if (Number.isNaN(id)) { return 'id非法'; }
  const cs = await CategoryEntity.findAll({ where: { parentId: id } });
  const ids: number[] = [id, ...cs.map(c => c.id)];
  const { rows: acs, count } = await ArticleCagtegoriesEntity.findAndCountAll({
    where: {
      categoryId: {
        [Op.in]: ids
      }
    }
  });

  const articles = await Promise.all(acs.map(ac => getArticle(ac.articleId) as Promise<IArticles>));

  return [articles, count];
}

const getArticlesByTagId = async (id: number): Promise<string | [IArticles[], number]> => {
  if (Number.isNaN(id)) { return 'id非法'; }
  const { rows: ats, count } = await ArticleTagsEntity.findAndCountAll({ where: { tagId: id } });
  const articles = await Promise.all(ats.map(at => getArticle(at.articleId) as Promise<IArticles>));
  return [articles, count];
}

export {
  getArchives,
  getArticleById,
  getArticles,
  addArticle,
  updateArticle,
  deleteArticle,
  getArticlesByCategoryId,
  getArticlesByTagId
}