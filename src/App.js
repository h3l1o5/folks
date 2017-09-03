import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import io from 'socket.io-client'

import { setSocket } from './actions/authActions'
import { getRoomsFromServer, addMember } from './actions/roomsActions'
import { updatePosition, addMessage } from './actions/currentRoomActions'
import initSocket from './utils/initSocket'
import AppBar from './appBar/AppBar'
import routes from './routes'

import './App.css'

class App extends Component {
  componentDidMount() {
    this.props.getRoomsFromServer()
    // set socket to store.auth.socket
    this.setSocketToStore()
  }

  componentWillUnmount() {
    this.props.socket.close()
  }

  setSocketToStore = () => {
    const socket = io()
    const { updatePosition, addMember, addMessage } = this.props
    const actions = {
      updatePosition,
      addMember,
      addMessage,
    }
    initSocket(socket, actions)
    this.props.setSocket(socket)
  }

  render() {
    return (
      <div className="app">
        <AppBar />
        <div className="appContent">{routes}</div>
      </div>
    )
  }
}

App.defaultProps = {
  socket: {},
}

App.propTypes = {
  getRoomsFromServer: PropTypes.func.isRequired,
  setSocket: PropTypes.func.isRequired,
  socket: PropTypes.object,
  updatePosition: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  socket: state.auth.socket,
})

// react-router issue#4671
export default withRouter(
  connect(mapStateToProps, {
    getRoomsFromServer,
    setSocket,
    updatePosition,
    addMember,
    addMessage,
  })(App),
)
