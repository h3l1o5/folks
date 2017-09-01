import _ from 'lodash'
import {
  SET_CURRENT_ROOM,
  ADD_MESSAGE,
  UPDATE_POSITION,
} from '../actions/types'

const initialState = {
  id: null,
  title: null,
  createBy: null,
  createAt: null,
  members: null,
  messages: null,
  socket: null,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_ROOM: {
      return {
        id: action.roomId,
        title: action.title,
        createBy: action.createBy,
        createAt: action.createAt,
        members: action.members,
        messages: action.messages,
        socket: action.socket,
      }
    }
    case ADD_MESSAGE: {
      const newMessages = [
        ...state.messages,
        {
          id: action.messageId,
          createBy: action.createBy,
          createAt: action.createAt,
          content: action.content,
        },
      ]
      return {
        ...state,
        messages: newMessages,
      }
    }
    case UPDATE_POSITION: {
      const targetMemberIndex = _.findIndex(state.members, {
        username: action.username,
      })
      const targetMember = state.members[targetMemberIndex]
      const newMembers = [
        ...state.members.slice(0, targetMemberIndex),
        {
          ...targetMember,
          lastPosition: action.position,
        },
        ...state.members.slice(targetMemberIndex + 1, state.members.length),
      ]
      return {
        ...state,
        members: newMembers,
      }
    }
    default:
      return state
  }
}
