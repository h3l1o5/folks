import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import io from 'socket.io-client'

import { enterRoom, leaveRoom } from '../actions/roomActions'
import { addMessage } from '../actions/roomsActions'

import Dialog from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import CloseIcon from 'material-ui-icons/Close'
import Slide from 'material-ui/transitions/Slide'
import Icon from 'material-ui/Icon'

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
    this.props.room.socket.close()
    this.props.leaveRoom(this.props.room.currentRoomId, this.props.room.socket)
  }

  initialSocket = (socket) => {
    socket.on('new message', (message) => {
      this.props.addMessage(this.props.room.currentRoomId, message.createBy, message.content)
    })
  }

  handleRequestClose = () => {
    this.setState({ open: false });
    setTimeout(() => {
      this.context.router.history.push('/app/lobby')
    }, 250)
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleSubmit = () => {
    this.props.room.socket.emit('message', {
      roomId: this.props.room.currentRoomId,
      user: this.props.user,
      content: this.state.messageContent
    })
    this.props.addMessage(this.props.room.currentRoomId, this.props.user.username, this.state.messageContent)
  }

  render() {
    const currentRoom = _.find(this.props.rooms, { 'id': this.props.match.params.roomId })
    return (
      <div>
        {currentRoom &&
          <Dialog
            fullScreen
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
            transition={<Slide direction="up" />}
          >
            <AppBar position="static">
              <Toolbar>
                <IconButton color="contrast" onClick={this.handleRequestClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography type="title" color="inherit">
                  {currentRoom.title}
                </Typography>
              </Toolbar>
            </AppBar>
            <div className="messageList">
              {currentRoom.messages.map((message) => (
                <h3 key={Math.random()}>{message.createBy} : {message.content}</h3>
              ))}
            </div>
            <div className="messageForm">
              <input 
                type="text" 
                value={this.state.message} 
                placeholder={`Message #${currentRoom.title}`}
                onChange={(e) => this.setState({ messageContent: e.target.value })} 
              />
              <button className="sendMessageButton" disabled={true}>
                <span onClick={this.handleSubmit} disabled={true}><Icon color="primary">send</Icon></span>
              </button>
            </div>
          </Dialog>
        }
      </div>
    )
  }
}

Room.propTypes = {
  room: PropTypes.object.isRequired,
  rooms: PropTypes.array.isRequired,
  enterRoom: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired,
}

Room.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    room: state.room,
    rooms: state.rooms
  }
}

export default connect(mapStateToProps, { enterRoom, leaveRoom, addMessage })(Room)