import { SET_CURRENT_ROOM } from './types'

const enterRoom = (roomId) => {
  return {
    type: SET_CURRENT_ROOM,
    roomId
  }
}

export {
  enterRoom,
}