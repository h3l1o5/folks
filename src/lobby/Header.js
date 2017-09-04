import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setShowAddRoomModal } from '../actions/lobbyActions'

import './Header.css'

const AppBar = props => (
  <div className="appBar">
    <div className="brand">folks</div>
    <div className="addRoom">
      <i
        className="material-icons"
        role="button"
        tabIndex="0"
        onClick={() => props.setShowAddRoomModal(true)}
      >
        add
      </i>
    </div>
  </div>
)

AppBar.propTypes = {
  setShowAddRoomModal: PropTypes.func.isRequired,
}

export default connect(null, { setShowAddRoomModal })(AppBar)
