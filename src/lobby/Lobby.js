import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import RoomCardList from './RoomCardList'
import AddRoomModal from './AddRoomModal'
import { setShowAddRoomModal } from '../actions/lobbyActions'
import { getRoomsFromServer } from '../actions/roomsActions'

import './Lobby.css'

class Lobby extends Component {
  state = {
    roomViewOpen: false,
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
    return (
      <div className="lobby">
        <AddRoomModal
          show={this.props.showAddRoomModal}
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
  setShowAddRoomModal: PropTypes.func.isRequired,
  getRoomsFromServer: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  showAddRoomModal: state.lobby.showAddRoomModal,
})

export default connect(mapStateToProps, {
  setShowAddRoomModal,
  getRoomsFromServer,
})(Lobby)
