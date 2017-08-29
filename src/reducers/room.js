import { SET_CURRENT_ROOM } from '../actions/types'

const initialState = {
  currentRoomId: null,
  socket: null
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SET_CURRENT_ROOM:
      return {
        currentRoomId: action.roomId,
        socket: action.socket
      }
    default:
      return state
  }
}