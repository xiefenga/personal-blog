import { SET_SITE_INFO } from '../action/site'

const initialState = {};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case SET_SITE_INFO:
      return { ...payload }

    default:
      return state
  }
}

export default reducer
