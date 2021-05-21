import { SET_ADMIN, LOGOUT } from '../action/admin'

const initialState = null;

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case SET_ADMIN:
      return { ...payload }

    case LOGOUT:
      return initialState

    default:
      return state
  }
}

export default reducer
