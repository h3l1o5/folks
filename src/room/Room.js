import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import io from 'socket.io-client'

import Dialog from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import { enterRoom, leaveRoom } from '../actions/currentRoomActions'
import { sendMessage, receiveMessage } from '../actions/currentRoomActions'
import MessageList from './MessageList'
import MessageForm from './MessageForm'
import Header from './Header'

import './Room.css'

class Room extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      messageContent: ''
    }
  }

  componentDidMount() {
    const socket = io()
    this.initialSocket(socket)
    this.props.enterRoom(this.props.match.params.roomId, socket)
  }

  componentWillUnmount() {
    this.props.currentRoom.socket.close()
    this.props.leaveRoom(this.props.currentRoom.id, this.props.currentRoom.socket)
  }

  initialSocket = (socket) => {
    socket.on('new message', (message) => {
      this.props.receiveMessage(message.id, message.createBy, message.createAt, message.content)
    })
  }

  handleRoomClose = () => {
    this.setState({ open: false });
    setTimeout(() => {
      this.context.router.history.push('/app/lobby')
    }, 250)
  }

  handleSubmit = (messageContent) => {
    const { id, socket } = this.props.currentRoom
    this.props.sendMessage(id, socket, this.props.user.username, messageContent)
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
              onCloseButtonClick={this.handleRoomClose}
            />
            {currentRoom.id &&
              <MessageList messages={currentRoom.messages}/>
            }
            <MessageForm
              placeholder={`Message #${currentRoom.title}`}
              onSubmit={this.handleSubmit}
            />
          </Dialog>
      </div>
    )
  }
}

Room.propTypes = {
  user: PropTypes.object.isRequired,
  currentRoom: PropTypes.object.isRequired,
  rooms: PropTypes.array.isRequired,
  enterRoom: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  receiveMessage: PropTypes.func.isRequired,
}

Room.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    currentRoom: state.currentRoom,
    rooms: state.rooms
  }
}

export default connect(mapStateToProps, { enterRoom, leaveRoom, sendMessage, receiveMessage })(Room)