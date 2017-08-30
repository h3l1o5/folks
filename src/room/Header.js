import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import CloseIcon from 'material-ui-icons/Close'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <AppBar position="static" color="accent">
          <Toolbar>
            <IconButton color="contrast" onClick={this.props.onCloseButtonClick} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography type="title" color="inherit">
              {this.props.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Header.propTypes = {
  onCloseButtonClick: PropTypes.func.isRequired,
  title: PropTypes.string,
}


export default Header