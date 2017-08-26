import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setShowAddRoomModal } from '../actions/lobbyActions'

import './AppBar.css'

class AppBar extends Component {

  handleAddRoomClick = () => {
    this.props.setShowAddRoomModal(true)
  }

  render() {
    return (
      <div className="appBar">
        <div className="brand">folks</div>
        <div className="addRoom">
          <i className="material-icons" onClick={this.handleAddRoomClick}>add</i>
        </div>
      </div>
    )
  }
}

export default connect(null, { setShowAddRoomModal })(AppBar)