import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'

import { Loader, Dimmer } from 'semantic-ui-react'
import RoomCardList from './RoomCardList'
import AddRoomModal from './AddRoomModal'
import { setShowAddRoomModal } from '../actions/lobbyActions'
import { getRoomsFromServer } from '../actions/roomsActions'

import './Lobby.css'

class Lobby extends Component {
  handleAddRoomModalClose = () => {
    this.props.setShowAddRoomModal(false)
  }

  handleAddRoomModalSubmit = (info) => {
    axios.post('/api/v1/rooms', {
      title: info.title
    })
    .then(() => {
      this.props.setShowAddRoomModal(false)
      this.props.getRoomsFromServer()
    })
    .catch((err) => console.log(err))
  }

  render() {
    return (
      <div className="lobby">
        {this.props.isLoading ? <Dimmer active><Loader indeterminate>Loading</Loader></Dimmer> : null}
        <AddRoomModal 
          show={this.props.showAddRoomModal} 
          onClose={this.handleAddRoomModalClose} 
          onSubmit={this.handleAddRoomModalSubmit}
        />
        <RoomCardList />
      </div>
    )
  }
}

Lobby.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  showAddRoomModal: PropTypes.bool.isRequired,
  setShowAddRoomModal: PropTypes.func.isRequired,
  getRoomsFromServer: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.lobby.isLoading,
    showAddRoomModal: state.lobby.showAddRoomModal,
  }
}

export default connect(mapStateToProps, { setShowAddRoomModal, getRoomsFromServer })(Lobby)