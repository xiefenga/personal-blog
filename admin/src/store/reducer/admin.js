import { SET_ADMIN } from '../action/admin';

const initialState = null;

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case SET_ADMIN:
      return { ...payload }

    default:
      return state
  }
}

export default reducer
