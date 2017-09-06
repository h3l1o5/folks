import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import io from 'socket.io-client'

import routes from './routes'
import { setSocket } from './actions/authActions'
import { addMember, getRoomsFromServer } from './actions/roomsActions'
import {
  updatePosition,
  addMessage,
  setMembers,
} from './actions/currentRoomActions'
import initSocket from './utils/initSocket'

import './App.css'

class App extends Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.getRoomsFromServer()
    }
    // set socket to store.auth.socket
    this.setSocketToStore()
  }

  componentWillUnmount() {
    this.props.socket.close()
    this.props.setSocket({})
  }

  setSocketToStore = () => {
    const socket = io()
    const { updatePosition, addMember, addMessage, setMembers } = this.props
    const actions = {
      updatePosition,
      addMember,
      addMessage,
      setMembers,
    }
    initSocket(socket, actions)
    this.props.setSocket(socket)
  }

  render() {
    return (
      <div className="app">
        <div className="appContent">{routes}</div>
      </div>
    )
  }
}

App.defaultProps = {
  user: null,
  socket: null,
}

App.propTypes = {
  getRoomsFromServer: PropTypes.func.isRequired,
  setSocket: PropTypes.func.isRequired,
  updatePosition: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  setMembers: PropTypes.func.isRequired,
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
    updatePosition,
    addMember,
    addMessage,
    setMembers,
  })(App)
)
