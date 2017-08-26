import { SET_LOADING_STATUS } from '../actions/types'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state
  }
}