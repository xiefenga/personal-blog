import { SET_CATEGORIES } from '../action/categories'

const initialState = [];
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case SET_CATEGORIES:
      return [...payload]

    default:
      return state
  }
}

export default reducer
