import _ from 'lodash'

import { SET_ROOM_LIST, ADD_MEMBER, ADD_MESSAGE } from '../actions/types'

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_ROOM_LIST: {
      return action.rooms
    }
    case ADD_MEMBER: {
      const roomIndex = _.findIndex(state, { 'id': action.roomId })
      const targetRoom = state[roomIndex]
        const newMembers = [
          ...targetRoom.members,
          action.username
        ]
        return [
          ...state.slice(0, roomIndex),
          {
            ...targetRoom,
            members: newMembers
          },
          ...state.slice(roomIndex + 1, state.length)
        ]
    }
    case ADD_MESSAGE: {
      const roomIndex = _.findIndex(state, { 'id': action.roomId })
      const targetRoom = state[roomIndex]
      const newMessages = [
        ...targetRoom.messages,
        {
          createBy: action.createBy,
          createAt: action.createAt,
          content: action.content
        }
      ] 
      return [
        ...state.slice(0, roomIndex),
        {
          ...targetRoom,
          messages: newMessages
        },
        ...state.slice(roomIndex + 1, state.length)
      ]
    }
    default:
      return state;
  }
};