import { SET_LOADING_STATUS, SET_ADD_ROOM_MODAL_STATUS } from '../actions/types'

const setLobbyIsLoading = (isLoading) => {
  return {
    type: SET_LOADING_STATUS,
    isLoading
  }
}

const setShowAddRoomModal = (show) => {
  return {
    type: SET_ADD_ROOM_MODAL_STATUS,
    show
  }
}

export {
  setLobbyIsLoading,
  setShowAddRoomModal
}