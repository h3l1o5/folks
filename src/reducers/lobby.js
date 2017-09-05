import {
  SET_ADD_ROOM_MODAL_STATUS,
  SET_SIDE_MENU_STATUS,
  SET_SNACKBAR_STATUS,
} from '../actions/types'

const initialState = {
  showAddRoomModal: false,
  showSideMenu: false,
  snackBar: {
    open: false,
    color: null,
    message: null,
  },
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ADD_ROOM_MODAL_STATUS:
      return {
        ...state,
        showAddRoomModal: action.show,
      }
    case SET_SIDE_MENU_STATUS:
      return {
        ...state,
        showSideMenu: action.show,
      }
    case SET_SNACKBAR_STATUS:
      return {
        ...state,
        snackBar: action.snackBar,
      }
    default:
      return state
  }
}
