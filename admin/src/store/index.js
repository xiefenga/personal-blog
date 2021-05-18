import reducer from './reducer'
import ReduxThunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(ReduxThunk)
  )
);

export default store