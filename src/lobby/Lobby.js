import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Snackbar from 'material-ui/Snackbar'
import RoomCardList from './RoomCardList'
import AddRoomModal from './AddRoomModal'
import { setShowAddRoomModal, setSnackBar } from '../actions/lobbyActions'
import { getRoomsFromServer } from '../actions/roomsActions'

import './Lobby.css'

class Lobby extends Component {
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

Lobby.propTypes = {
  showAddRoomModal: PropTypes.bool.isRequired,
  snackBar: PropTypes.object.isRequired,
  setShowAddRoomModal: PropTypes.func.isRequired,
  getRoomsFromServer: PropTypes.func.isRequired,
  setSnackBar: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  showAddRoomModal: state.lobby.showAddRoomModal,
  snackBar: state.lobby.snackBar,
})

export default connect(mapStateToProps, {
  setShowAddRoomModal,
  getRoomsFromServer,
  setSnackBar,
})(Lobby)
