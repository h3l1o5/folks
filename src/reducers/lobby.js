import { SET_ADD_ROOM_MODAL_STATUS } from '../actions/types'

const initialState = {
  showAddRoomModal: false,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ADD_ROOM_MODAL_STATUS:
      return {
        ...state,
        showAddRoomModal: action.show
      }
    default:
      return state
  }
}