import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setShowAddRoomModal } from '../actions/lobbyActions'

import './AppBar.css'

class AppBar extends Component {
  render() {
    return (
      <div className="appBar">
        <div className="brand">folks</div>
        <div className="addRoom">
          <i className="material-icons" onClick={() => this.props.setShowAddRoomModal(true)}>add</i>
        </div>
      </div>
    )
  }
}

AppBar.propTypes = {
  setShowAddRoomModal: PropTypes.func.isRequired,
}

export default connect(null, { setShowAddRoomModal })(AppBar)