import { combineReducers } from 'redux'

import auth from './auth'
import rooms from './rooms'
import lobby from './lobby'

export default combineReducers({
  auth,
  rooms,
  lobby
})