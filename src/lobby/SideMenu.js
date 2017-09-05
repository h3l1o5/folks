import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Sidebar, Menu, Icon } from 'semantic-ui-react'
import { logout } from '../actions/authActions'
import { setShowSideMenu } from '../actions/lobbyActions'

import './SideMenu.css'

class SideMenu extends Component {
  handleLogoutClick = () => {
    this.props.setShowSideMenu(false)
    this.props.logout()
    this.context.router.history.push('/')
  }

  render() {
    return (
      <Sidebar
        as={Menu}
        animation="push"
        width="very thin"
        visible={this.props.visible}
        vertical
        floated
      >
        <button className="menuButton foo">
          <Icon color="black" name="search" />
          foooo
        </button>
        <button className="menuButton bar">
          <Icon color="black" name="feed" />
          barrr
        </button>
        <button className="menuButton setting">
          <Icon color="black" name="setting" />
          setting
        </button>
        <button className="menuButton logout" onClick={this.handleLogoutClick}>
          <Icon color="black" name="user outline" />
          logout
        </button>
      </Sidebar>
    )
  }
}

SideMenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  setShowSideMenu: PropTypes.func.isRequired,
}

SideMenu.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(null, { logout, setShowSideMenu })(SideMenu)
