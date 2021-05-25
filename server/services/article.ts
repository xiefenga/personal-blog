import { Op } from 'sequelize'
import ArticleModel from '../models/Article'
import ArticleEntity from '../db/entities/Article'
import { plainTransform } from '../utils/transform'
import { throwValidateError, wordCounts } from '../utils/helper'
import { EXCLUDE_TIMESTAME, SITE_CONFIG_PATH } from '../utils/constants'
import ArticleCagtegoryEntity from '../db/entities/ArticleCategory'
import ArticleTagEntity from '../db/entities/ArticleTag'
import { IArticle, IArticles } from '../types/models'
import CategoryEntity from '../db/entities/Category'
import TagEntity from '../db/entities/Tag'
import { UnknowObject } from '../types/helper'
import { categoriesValidate, emptyModelValidate, idValidate, positiveIntValidate, removeInvalidCId, tagsValidate, validateModel, validateTitleSafe } from '../utils/validate'
import { ARTICLE_NOT_EXIST, ID_INVALID, PAGE_INVALID, SIZE_INVALID } from '../utils/tips'



// 获取归档
const getArchives = async (page: number = 1, size: number = 10): Promise<[IArticle[], number]> => {
  positiveIntValidate(page, PAGE_INVALID);
  positiveIntValidate(size, SIZE_INVALID);

  const { rows: articles, count } = await ArticleEntity.findAndCountAll({
    limit: size,
    offset: (page - 1) * size,
    order: [
      ['createdAt', 'DESC']
    ]
  });

  return [articles, count];
}

/**
 * 分页获取文章
 * @param page 页数
 * @param size 页容量
 */
const getArticles = async (page: number = 1, size: number = 10): Promise<[IArticles[], number]> => {
  positiveIntValidate(page, PAGE_INVALID);
  positiveIntValidate(size, SIZE_INVALID);
  const { rows, count } = await ArticleEntity.findAndCountAll({
    limit: size,
    offset: (page - 1) * size,
    order: [
      ['createdAt', 'DESC']
    ]
  });

  const articles = await Promise.all(
    rows.map(
      article => fillArticle(article)
    )
  );

  return [articles, count];
}

const fillArticle = async (article: ArticleEntity): Promise<IArticles> => {
  const { id } = article;
  // acs -> article category s
  // ats -> article tag s
  const [acs, ats] = await Promise.all([
    ArticleCagtegoryEntity.findAll({ where: { articleId: id } }),
    ArticleTagEntity.findAll({ where: { articleId: id } })
  ]);

  // cp -> categories promise
  const cp = Promise.all(
    acs.map(
      async ac => {
        const c = (
          await CategoryEntity.findByPk(ac.categoryId, EXCLUDE_TIMESTAME)
        )!;
        if (c.parentId !== null) {
          const p = (
            await CategoryEntity.findByPk(c.parentId, EXCLUDE_TIMESTAME)
          )!;
          return [p, c];
        }
        return [c];
      }
    )
  );

  // tp -> tags promise
  const tp = Promise.all(
    ats.map(at => TagEntity.findByPk(at.tagId, EXCLUDE_TIMESTAME) as Promise<TagEntity>
    )
  );

  const [categories, tags] = await Promise.all([cp, tp]);

  return { ...article.get(), categories, tags };
}

const getArticleById = async (id: number): Promise<IArticles> => {
  idValidate(id, ID_INVALID);
  const article = emptyModelValidate(
    await ArticleEntity.findByPk(id),
    ARTICLE_NOT_EXIST
  );
  return await fillArticle(article);
}

/**
 * 新增文章，成功返回新添加的信息，失败返回错误消息
 * @param value 添加的文章信息
 */
const addArticle = async (value: UnknowObject): Promise<IArticles> => {
  // 类型转换
  const article = plainTransform(ArticleModel, value);
  // 检测数据应当具有的字段和类型
  await validateModel(article);
  // 补全可以缺失的属性 cover
  if (!value.cover) {
    article.cover = require(SITE_CONFIG_PATH).defaultCover;
  }
  // 写入正确的字数
  article.words = wordCounts(article.content);

  const { categories, tags } = article;

  // cs -> categories
  const [cs] = await Promise.all([
    categoriesValidate(categories),
    tagsValidate(tags)
  ]);

  // ArticleCagtegories 表中的保持数据纯净，不记录 一篇文章和父子类目 的对应关系
  // 去除 article.categories 多余的数据（同时存在父子类目的父类目）
  removeInvalidCId(categories, cs);

  // 创建 Article 表中的数据
  let data: ArticleEntity;

  try {
    data = await ArticleEntity.create(article);
  } catch (_) {
    throwValidateError('添加失败, 请确保文章名唯一');
  }

  // ArticleCagtegories 和 ArticleTags 表中的数据的创建
  await Promise.all([
    Promise.all(
      categories.map(
        id => ArticleCagtegoryEntity.create({
          articleId: data.id,
          categoryId: id
        })
      )
    ),
    Promise.all(
      tags.map(
        id => ArticleTagEntity.create({
          articleId: data.id,
          tagId: id
        })
      )
    )
  ]);

  return await fillArticle(data);
}

const updateArticle = async (id: number, value: UnknowObject): Promise<IArticles> => {

  idValidate(id, ID_INVALID);

  const article = emptyModelValidate(
    await ArticleEntity.findByPk(id),
    ARTICLE_NOT_EXIST
  );

  const update = plainTransform(ArticleModel, value);

  await validateModel(update, true);

  const { title, categories, tags, content, cover } = value as ArticleModel & UnknowObject;

  // 检查 title 是否重复
  if (title) {
    await validateTitleSafe(id, title);
  }

  if (categories) {
    // 验证 categories 数据
    const cs = await categoriesValidate(categories);
    //  去除 article.categories 多余的数据（同时存在父子类目的父类目）
    removeInvalidCId(categories, cs);

    // 所有需要被删除的 article category 关系
    const acs = await ArticleCagtegoryEntity.findAll({
      where: {
        articleId: id,
        categoryId: {
          [Op.notIn]: categories
        }
      }
    });

    await Promise.all([
      // 删除 不需要的 article category 关系
      Promise.all(
        acs.map(ac => ac.destroy())
      ),
      // 添加 新的 article category 关系
      Promise.all(
        categories.map(c => ArticleCagtegoryEntity.findOrCreate({
          where: {
            articleId: id,
            categoryId: c
          }
        }))
      )
    ]);
  }

  if (tags) {
    // 验证 tags 数据
    await tagsValidate(tags);

    // 所有需要被删除的 article tag 关系
    const ats = await ArticleTagEntity.findAll({
      where: {
        articleId: id,
        tagId: {
          [Op.notIn]: tags
        }
      }
    });

    await Promise.all([
      // 删除 不需要的 article tag 关系
      Promise.all(
        ats.map(at => at.destroy())
      ),
      // 添加 新的 article tag 关系
      Promise.all(
        tags.map(t => ArticleTagEntity.findOrCreate({
          where: {
            articleId: id,
            tagId: t
          }
        }))
      )
    ]);
  }

  if (title) {
    article.title = title;
  }

  if (content) {
    article.content = content;
    article.words = wordCounts(content);
  }
  if (cover) {
    article.cover = cover;
  }
  article.save();

  return await fillArticle(article);
}


const deleteArticle = async (id: number): Promise<void> => {
  try {
    idValidate(id, ID_INVALID);
  } catch (__) {
    // 即使 id 非法，也不返回错误
    return;
  }
  await ArticleEntity.destroy({ where: { id } });
  // ArticleCategories 和 ArticleTags 会自动删除
}


const getArticlesByCategoryId = async (id: number): Promise<[IArticles[], number]> => {
  idValidate(id, ID_INVALID);
  // cs -> categories 
  const cs = await CategoryEntity.findAll({
    where: {
      parentId: id
    }
  });
  const ids: number[] = [id, ...cs.map(c => c.id)];
  const { rows: acs, count } = await ArticleCagtegoryEntity.findAndCountAll({
    where: {
      categoryId: {
        [Op.in]: ids
      }
    }
  });

  const articles = await Promise.all(
    acs.map(
      ac => getArticleById(ac.articleId)
    )
  );

  return [articles, count];
}

const getArticlesByTagId = async (id: number): Promise<[IArticles[], number]> => {
  idValidate(id, ID_INVALID);

  const { rows: ats, count } = await ArticleTagEntity.findAndCountAll({
    where: {
      tagId: id
    }
  });
  const articles = await Promise.all(
    ats.map(
      at => getArticleById(at.articleId)
    )
  );
  return [articles, count];
}

export {
  getArchives,
  getArticles,
  getArticleById,
  addArticle,
  updateArticle,
  deleteArticle,
  getArticlesByCategoryId,
  getArticlesByTagId
}