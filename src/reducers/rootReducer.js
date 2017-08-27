import { combineReducers } from 'redux'

import auth from './auth'
import room from './room'
import rooms from './rooms'
import lobby from './lobby'

export default combineReducers({
  auth,
  room,
  rooms,
  lobby
})