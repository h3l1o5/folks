import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Snackbar from 'material-ui/Snackbar'
import Header from './Header'
import RoomCardList from './RoomCardList'
import AddRoomModal from './AddRoomModal'
import { setShowAddRoomModal, setSnackBar } from '../actions/lobbyActions'
import { getRoomsFromServer, addMember } from '../actions/roomsActions'
import { updatePosition, addMessage } from '../actions/currentRoomActions'
import { setSocket } from '../actions/authActions'
import initSocket from '../utils/initSocket'

import './Lobby.css'

class Lobby extends Component {
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

  handleAddRoomModalClose = () => {
    this.props.setShowAddRoomModal(false)
  }

  handleAddRoomModalSubmit = info => {
    axios
      .post('/api/v1/rooms', {
        title: info.title,
      })
      .then(() => {
        this.props.setShowAddRoomModal(false)
        this.props.getRoomsFromServer()
      })
      .catch(err => console.log(err))
  }

  render() {
    const { showAddRoomModal, setSnackBar, snackBar } = this.props
    return (
      <div className="lobby">
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={snackBar.open}
          message={
            <span id="message" style={{ color: snackBar.color }}>
              {snackBar.message}
            </span>
          }
          onRequestClose={() => setSnackBar({ open: false })}
          autoHideDuration={2000}
        />
        <AddRoomModal
          show={showAddRoomModal}
          onClose={this.handleAddRoomModalClose}
          onSubmit={this.handleAddRoomModalSubmit}
        />
        <Header />
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          <RoomCardList />
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

Lobby.defaultProps = {
  socket: {},
}

Lobby.propTypes = {
  showAddRoomModal: PropTypes.bool.isRequired,
  snackBar: PropTypes.object.isRequired,
  setShowAddRoomModal: PropTypes.func.isRequired,
  getRoomsFromServer: PropTypes.func.isRequired,
  setSnackBar: PropTypes.func.isRequired,
  setSocket: PropTypes.func.isRequired,
  socket: PropTypes.object,
  updatePosition: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  showAddRoomModal: state.lobby.showAddRoomModal,
  snackBar: state.lobby.snackBar,
})

export default connect(mapStateToProps, {
  setShowAddRoomModal,
  getRoomsFromServer,
  setSnackBar,
  setSocket,
  updatePosition,
  addMember,
  addMessage,
})(Lobby)
