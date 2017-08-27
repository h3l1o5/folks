import { SET_ADD_ROOM_MODAL_STATUS } from '../actions/types'

const setShowAddRoomModal = (show) => {
  return {
    type: SET_ADD_ROOM_MODAL_STATUS,
    show
  }
}

export {
  setShowAddRoomModal
}