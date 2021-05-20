import admin from './admin'
import article from './article'
import { combineReducers } from 'redux'

export default combineReducers({
  admin,
  article
});