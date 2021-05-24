import { SET_ARTICLE, CLEAR_ARTICLE } from '../action/article'

const initialState = {}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case SET_ARTICLE:
      return { ...state, ...payload }

    case CLEAR_ARTICLE:
      return initialState

    default:
      return state
  }
}

export default reducer
