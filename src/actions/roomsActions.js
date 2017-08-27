import axios from 'axios'

import { SET_ROOM_LIST, ADD_MEMBER } from '../actions/types'
import { setLobbyIsLoading } from '../actions/lobbyActions'

const getRoomsFromServer = () => (dispatch) => {
  dispatch(setLobbyIsLoading(true))

  axios.get('/api/v1/rooms')
  .then((res) => {
    dispatch(setRoomsList(res.data.rooms))
    dispatch(setLobbyIsLoading(false))
  })
  .catch((err) => { 
    console.log(err) 
    dispatch(setLobbyIsLoading(false))
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
  addMember
}