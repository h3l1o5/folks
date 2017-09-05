import {
  SET_ADD_ROOM_MODAL_STATUS,
  SET_SIDE_MENU_STATUS,
  SET_SNACKBAR_STATUS,
} from '../actions/types'

const setShowAddRoomModal = show => ({
  type: SET_ADD_ROOM_MODAL_STATUS,
  show,
})

const setShowSideMenu = show => ({
  type: SET_SIDE_MENU_STATUS,
  show,
})

const setSnackBar = snackBar => ({
  type: SET_SNACKBAR_STATUS,
  snackBar,
})

export { setShowAddRoomModal, setShowSideMenu, setSnackBar }
