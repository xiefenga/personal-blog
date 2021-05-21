import tags from './tags'
import admin from './admin'
import article from './article'
import { combineReducers } from 'redux'

export default combineReducers({
  tags,
  admin,
  article
});