import { SET_CURRENT_ROOM } from './types'

const enterRoom = (roomId, socket) => (dispatch) => {
  socket.emit('room', { roomId })
  dispatch({
    type: SET_CURRENT_ROOM,
    roomId,
    socket
  })
}

const leaveRoom = (roomId, socket) => (dispatch) => {
  socket.emit('leave room', { roomId })
  dispatch({
    type: SET_CURRENT_ROOM,
    roomId: null,
    socket: null
  })
}

export {
  enterRoom,
  leaveRoom
}