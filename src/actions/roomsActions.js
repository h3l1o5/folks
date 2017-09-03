import axios from 'axios'

import { SET_ROOM_LIST, ADD_MEMBER } from '../actions/types'

const setRoomsList = rooms => ({
  type: SET_ROOM_LIST,
  rooms,
})

const getRoomsFromServer = () => dispatch => {
  axios
    .get('/api/v1/rooms')
    .then(res => {
      dispatch(setRoomsList(res.data.rooms))
    })
    .catch(err => {
      console.log(err)
    })
}

const addMember = (roomId, username) => ({
  type: ADD_MEMBER,
  roomId,
  username,
})

const joinRoom = (socket, roomId, username) => dispatch => {
  socket.emit('join room', {
    roomId,
    username,
  })
  dispatch(addMember(roomId, username))
}

export { getRoomsFromServer, setRoomsList, joinRoom, addMember }
