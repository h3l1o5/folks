import { SET_LOADING_STATUS } from '../actions/types'

const setLobbyIsLoading = (isLoading) => {
  return {
    type: SET_LOADING_STATUS,
    isLoading
  }
}

export {
  setLobbyIsLoading
}