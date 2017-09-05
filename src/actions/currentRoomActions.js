import axios from 'axios'
import uuid from 'uuid'

import {
  SET_CURRENT_ROOM,
  SET_CURRENT_ROOM_MEMBER,
  UPDATE_MESSAGES,
  ADD_MESSAGE,
  UPDATE_POSITION,
} from './types'

const enterRoom = (socket, roomId) => dispatch => {
  socket.emit('enter room', { roomId })
  axios.get(`/api/v1/room/${roomId}`).then(res => {
    const room = res.data
    dispatch({
      type: SET_CURRENT_ROOM,
      roomId,
      title: room.title,
      createBy: room.createBy,
      createAt: room.createAt,
      members: room.members,
      messages: room.messages,
    })
  })
}

const leaveRoom = (socket, roomId) => dispatch => {
  socket.emit('leave room', { roomId })
  dispatch({
    type: SET_CURRENT_ROOM,
    roomId: null,
    title: null,
    createBy: null,
    createAt: null,
    members: null,
    messages: null,
  })
}

const setMembers = (username, lastPosition) => ({
  type: SET_CURRENT_ROOM_MEMBER,
  username,
  lastPosition,
})

const getMessagesFromServer = roomId => dispatch => {
  axios.get(`/api/v1/room/${roomId}/messages`).then(messages => {
    dispatch({
      type: UPDATE_MESSAGES,
      roomId,
      messages,
    })
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
  enterRoom,
  leaveRoom,
  setMembers,
  getMessagesFromServer,
  addMessage,
  sendMessage,
  updatePosition,
  sendPosition,
}
