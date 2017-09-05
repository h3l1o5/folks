import React from 'react'
import PropTypes from 'prop-types'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import CloseIcon from 'material-ui-icons/Close'
import Switch from 'material-ui/Switch'

import './Header.css'

const Header = props => (
  <div className="header">
    <AppBar position="static" color="accent">
      <Toolbar>
        <IconButton
          color="contrast"
          onClick={props.onCloseButtonClick}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
        <Typography type="title" color="inherit">
          {props.title}
        </Typography>

        <div className="mapSwitcher">
          <Switch
            checked={props.showMap}
            onChange={(event, checked) => props.onMapSwitherClick(checked)}
          />
        </div>
      </Toolbar>
    </AppBar>
  </div>
)

Header.defaultProps = {
  title: '',
}

Header.propTypes = {
  onCloseButtonClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  showMap: PropTypes.bool.isRequired,
  onMapSwitherClick: PropTypes.func.isRequired,
}

export default Header
