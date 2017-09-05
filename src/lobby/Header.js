import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setShowAddRoomModal, setShowSideMenu } from '../actions/lobbyActions'

import './Header.css'

const AppBar = props => (
  <div className="appBar">
    <div className="menu">
      <i
        className="material-icons"
        role="button"
        tabIndex="0"
        onClick={() => props.setShowSideMenu(!props.showSideMenu)}
      >
        menu
      </i>
    </div>
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
  setShowSideMenu: PropTypes.func.isRequired,
  showSideMenu: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  showSideMenu: state.lobby.showSideMenu,
})

export default connect(mapStateToProps, {
  setShowAddRoomModal,
  setShowSideMenu,
})(AppBar)
