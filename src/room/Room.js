import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import {
  fetchAndSetCurrentRoom,
  setCurrentRoom,
  sendMessage,
} from '../actions/currentRoomActions'
import Header from './Header'
import MapView from './MapView'
import MessageList from './MessageList'
import MessageForm from './MessageForm'

class Room extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      showMap: false,
    }
  }

  componentDidMount() {
    const { socket, match, fetchAndSetCurrentRoom } = this.props
    if (socket) {
      const roomId = match.params.roomId
      socket.emit('enter room', { roomId })
      fetchAndSetCurrentRoom(roomId)
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.socket) {
      const { match, fetchAndSetCurrentRoom } = this.props
      const roomId = match.params.roomId
      fetchAndSetCurrentRoom(roomId)
    }
  }

  componentWillUnmount() {
    const { socket, currentRoom, setCurrentRoom } = this.props
    if (socket) {
      const roomId = currentRoom.id
      socket.emit('leave room', { roomId })
      setCurrentRoom(null)
    }
  }

  handleRoomClose = () => {
    this.setState({ open: false })
    setTimeout(() => {
      this.context.router.history.goBack()
    }, 250)
  }

  handleSendMessage = messageContent => {
    const { socket, currentRoom, user, sendMessage } = this.props
    sendMessage(socket, currentRoom.id, user.username, messageContent)
  }

  handleShowMap = showMap => {
    this.setState({ showMap })
  }

  render() {
    const currentRoom = this.props.currentRoom
    if (!currentRoom) return null

    return (
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
          <MapView />
        ) : (
          <MessageList messages={currentRoom.messages} />
        )}
        <MessageForm
          placeholder={`Message #${currentRoom.title}`}
          onSubmit={this.handleSendMessage}
        />
      </Dialog>
    )
  }
}

Room.defaultProps = {
  socket: null,
  currentRoom: null,
}

Room.propTypes = {
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  socket: PropTypes.object,
  currentRoom: PropTypes.object,
  fetchAndSetCurrentRoom: PropTypes.func.isRequired,
  setCurrentRoom: PropTypes.func.isRequired,
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
  fetchAndSetCurrentRoom,
  setCurrentRoom,
  sendMessage,
})(Room)
