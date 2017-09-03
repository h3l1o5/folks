import { SET_CURRENT_USER, SET_SOCKET } from '../actions/types'
import setAuthorizationToken from '../utils/setAuthorizationToken'

const setCurrentUser = (user, socket) => ({
  type: SET_CURRENT_USER,
  user,
  socket,
})

const setSocket = socket => ({
  type: SET_SOCKET,
  socket,
})

const logout = () => dispatch => {
  localStorage.removeItem('jwt')
  setAuthorizationToken(false)
  dispatch(setCurrentUser({}, {}))
}

export { logout, setCurrentUser, setSocket }
