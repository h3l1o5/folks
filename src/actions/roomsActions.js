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

const addMember = (roomId, username) => dispatch => {
  axios
    .post(`/api/v1/room/${roomId}/members`, { username })
    .then(() => {
      dispatch({
        type: ADD_MEMBER,
        roomId,
        username,
      })
    })
    .catch(err => console.log(err))
}

export { getRoomsFromServer, setRoomsList, addMember }
