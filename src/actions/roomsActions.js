import axios from 'axios'

import { SET_ROOM_LIST } from '../actions/types'
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

export {
  getRoomsFromServer,
  setRoomsList,
}