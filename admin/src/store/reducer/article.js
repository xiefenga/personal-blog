import { SET_ARTICLE } from '../action/article'

const initialState = {}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case SET_ARTICLE:
      return { ...state, ...payload }

    default:
      return state
  }
}

export default reducer
