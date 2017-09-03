import _ from 'lodash'

import { SET_CURRENT_USER, SET_SOCKET } from '../actions/types'

const initialState = {
  isAuthenticated: false,
  user: {},
  socket: {},
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !_.isEmpty(action.user),
        user: action.user,
        socket: action.socket,
      }
    case SET_SOCKET:
      return {
        ...state,
        socket: action.socket,
      }
    default:
      return state
  }
}
