import { SET_TAGS } from '../action/tags'

const initialState = [];

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case SET_TAGS:
      return [...payload]

    default:
      return state
  }
}

export default reducer
