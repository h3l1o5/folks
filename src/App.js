import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import io from 'socket.io-client'

import routes from './routes'
import { setSocket } from './actions/authActions'
import { getRoomsFromServer } from './actions/roomsActions'
import {
  setCurrentRoom,
  updatePosition,
  addMessage,
  fetchAndSetCurrentRoom,
} from './actions/currentRoomActions'
import initSocket from './utils/initSocket'

import './App.css'

class App extends Component {
  componentWillMount() {
    if (this.props.user) {
      this.props.getRoomsFromServer()
      // set socket to store.auth.socket
      this.setSocketToStore()
    }
  }

  componentWillUnmount() {
    const { socket, setSocket } = this.props
    if (socket) {
      socket.close()
      setSocket({})
    }
  }

  setSocketToStore = () => {
    const socket = io()
    const {
      setCurrentRoom,
      updatePosition,
      addMessage,
      fetchAndSetCurrentRoom,
    } = this.props
    const actions = {
      setCurrentRoom,
      updatePosition,
      addMessage,
      fetchAndSetCurrentRoom,
    }
    initSocket(socket, actions)
    this.props.setSocket(socket)
  }

  render() {
    return <div className="app">{routes}</div>
  }
}

App.defaultProps = {
  user: null,
  socket: null,
}

App.propTypes = {
  getRoomsFromServer: PropTypes.func.isRequired,
  setSocket: PropTypes.func.isRequired,
  setCurrentRoom: PropTypes.func.isRequired,
  updatePosition: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  fetchAndSetCurrentRoom: PropTypes.func.isRequired,
  user: PropTypes.object,
  socket: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.auth.user,
  socket: state.auth.socket,
})

export default withRouter(
  connect(mapStateToProps, {
    getRoomsFromServer,
    setSocket,
    setCurrentRoom,
    updatePosition,
    addMessage,
    fetchAndSetCurrentRoom,
  })(App)
)
