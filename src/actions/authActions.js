import { SET_CURRENT_USER } from '../actions/types'
import setAuthorizationToken from '../utils/setAuthorizationToken'

const logout = () => (dispatch) => {
  localStorage.removeItem('jwt')
  setAuthorizationToken(false)
  dispatch(setCurrentUser({}))
}

const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export {
  logout,
  setCurrentUser
}