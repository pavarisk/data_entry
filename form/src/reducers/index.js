import { combineReducers } from 'redux'

import getData from './data'
import user from './user'

export default combineReducers({
  getData,
  user
})
