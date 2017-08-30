import axios from 'axios'

import { SET_ROOM_LIST, ADD_MEMBER, ADD_MESSAGE } from '../actions/types'

const getRoomsFromServer = () => (dispatch) => {

  axios.get('/api/v1/rooms')
  .then((res) => {
    dispatch(setRoomsList(res.data.rooms))
  })
  .catch((err) => { 
    console.log(err) 
  })
}

const setRoomsList = (rooms) => {
  return {
    type: SET_ROOM_LIST,
    rooms
  }
}

const addMember = (roomId, username) => (dispatch) => {
  axios.post(`/api/v1/room/${roomId}/members`, {
    username
  })
  .then(() => {
    dispatch({
      type: ADD_MEMBER,
      roomId,
      username
    })
  })
  .catch((err) => console.log(err))
}

export {
  getRoomsFromServer,
  setRoomsList,
  addMember,
}