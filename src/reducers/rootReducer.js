import { combineReducers } from 'redux'

import auth from './auth'
import currentRoom from './currentRoom'
import rooms from './rooms'
import lobby from './lobby'

export default combineReducers({
  auth,
  currentRoom,
  rooms,
  lobby,
})
