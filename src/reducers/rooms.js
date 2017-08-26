import { SET_ROOM_LIST } from '../actions/types'

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_ROOM_LIST:
      return action.rooms
    default:
      return state;
  }
};