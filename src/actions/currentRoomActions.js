import axios from 'axios'
import uuid from 'uuid'

import { SET_CURRENT_ROOM, ADD_MESSAGE, UPDATE_POSITION } from './types'

const setCurrentRoom = room => ({
  type: SET_CURRENT_ROOM,
  room,
})

const fetchAndSetCurrentRoom = roomId => dispatch => {
  axios.get(`/api/v1/room/${roomId}`).then(res => {
    const room = res.data
    dispatch(
      setCurrentRoom({
        roomId,
        title: room.title,
        createBy: room.createBy,
        createAt: room.createAt,
        members: room.members,
        messages: room.messages,
      })
    )
  })
}

const addMessage = message => {
  const { messageId, createBy, createAt, content } = message
  return {
    type: ADD_MESSAGE,
    messageId,
    createBy,
    createAt,
    content,
  }
}

const sendMessage = (socket, roomId, createBy, content) => dispatch => {
  const messageId = uuid.v4()
  const createAt = Date.now().toString()
  socket.emit('message', {
    roomId,
    messageId,
    createBy,
    createAt,
    content,
  })
  dispatch(
    addMessage({
      messageId,
      createBy,
      createAt,
      content,
    })
  )
}

const updatePosition = (username, position) => ({
  type: UPDATE_POSITION,
  username,
  position,
})

const sendPosition = (socket, roomId, username, position) => dispatch => {
  socket.emit('position', {
    roomId,
    username,
    position,
  })
  dispatch(updatePosition(username, position))
}

export {
  setCurrentRoom,
  fetchAndSetCurrentRoom,
  addMessage,
  sendMessage,
  updatePosition,
  sendPosition,
}
