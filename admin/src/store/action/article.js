export const SET_ARTICLE = 'SET_ARTICLE';

export const CLEAR_ARTICLE = 'CLEAR_ARTICLE';

export const setArticleAction = (payload) => ({
  type: SET_ARTICLE,
  payload
});

export const clearArticleAction = (payload) => ({
  type: CLEAR_ARTICLE,
  payload
})



