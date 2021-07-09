import { Op } from 'sequelize'
import { IArticlePreview } from '../types/models'
import ArticleEntity from '../db/entities/Article'

export const getArticlesDateSummary = async () => {
  const { rows, count } = await ArticleEntity.findAndCountAll({
    order: [
      ['createdAt', 'DESC']
    ],
    attributes: {
      exclude: ['content']
    }
  });

  const map = new Map<string, number>();

  rows.forEach(article => {
    const created: Date = article.createdAt;
    const timeStr = `${created.getFullYear()}-${created.getMonth() + 1}`;
    map.set(timeStr, (map.get(timeStr) ?? 0) + 1);
  });

  return [
    [...map.entries()].reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Record<string, number>),
    count
  ];
}

export const getArticlesByDate = async (year: number, month: number): Promise<[IArticlePreview[], number]> => {
  console.log(year, month)
  const { rows, count } = await ArticleEntity.findAndCountAll({
    order: [
      ['createdAt', 'DESC']
    ],
    where: {
      createdAt: {
        [Op.lt]: new Date(year, month),
        [Op.gt]: new Date(year, month - 1)
      }
    },
    attributes: {
      exclude: ['content']
    }
  });

  return [rows, count];
}