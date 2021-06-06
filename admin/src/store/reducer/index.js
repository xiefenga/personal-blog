import tags from './tags'
import admin from './admin'
import siteInfo from './site'
import article from './article'
import categories from './categories'
import { combineReducers } from 'redux'

export default combineReducers({
  tags,
  admin,
  article,
  siteInfo,
  categories
});