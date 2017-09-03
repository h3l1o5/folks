import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import {
  enterRoom,
  leaveRoom,
  sendMessage,
} from '../actions/currentRoomActions'
import Header from './Header'
import Map from './Map'
import ChatRoom from './ChatRoom'

import './Room.css'

class Room extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      showMap: false,
    }
  }

  componentDidMount() {
    const { socket, match, enterRoom } = this.props
    if (socket) {
      enterRoom(socket, match.params.roomId)
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.socket) {
      const { socket, match, enterRoom } = this.props
      enterRoom(socket, match.params.roomId)
    }
  }

  componentWillUnmount() {
    const { socket, currentRoom, leaveRoom } = this.props
    if (socket) {
      leaveRoom(socket, currentRoom.id)
    }
  }

  handleRoomClose = () => {
    this.setState({ open: false })
    setTimeout(() => {
      this.context.router.history.push('/app/lobby')
    }, 250)
  }

  handleSubmit = messageContent => {
    const { socket, currentRoom, user, sendMessage } = this.props
    sendMessage(socket, currentRoom.id, user.username, messageContent)
  }

  handleShowMap = showMap => {
    this.setState({ showMap })
  }

  render() {
    const currentRoom = this.props.currentRoom
    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.open}
          onRequestClose={this.handleRoomClose}
          transition={<Slide direction="up" />}
        >
          <Header
            title={currentRoom.title}
            showMap={this.state.showMap}
            onCloseButtonClick={this.handleRoomClose}
            onMapSwitherClick={this.handleShowMap}
          />
          {this.state.showMap ? (
            <Map />
          ) : (
            <ChatRoom
              currentRoom={currentRoom}
              handleSubmit={this.handleSubmit}
            />
          )}
        </Dialog>
      </div>
    )
  }
}

Room.defaultProps = {
  socket: null,
}

Room.propTypes = {
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  socket: PropTypes.object,
  currentRoom: PropTypes.object.isRequired,
  enterRoom: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
}

Room.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.auth.user,
  socket: state.auth.socket,
  currentRoom: state.currentRoom,
  rooms: state.rooms,
})

export default connect(mapStateToProps, {
  enterRoom,
  leaveRoom,
  sendMessage,
})(Room)
