import { SET_LOADING_STATUS, SET_ADD_ROOM_MODAL_STATUS } from '../actions/types'

const initialState = {
  isLoading: false,
  showAddRoomModal: false,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case SET_ADD_ROOM_MODAL_STATUS:
      return {
        ...state,
        showAddRoomModal: action.show
      }
    default:
      return state
  }
}