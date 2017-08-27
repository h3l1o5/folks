import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'

import Button from 'material-ui/Button'
import Dialog from 'material-ui/Dialog'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import CloseIcon from 'material-ui-icons/Close'
import Slide from 'material-ui/transitions/Slide'

class Room extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
  }

  componentWillMount() {
    if (this.props.room.currentRoomId !== this.props.match.params.roomId) {
      this.context.router.history.push('/app')
    }
  }

  handleRequestClose = () => {
    this.setState({ open: false });
    setTimeout(() => {
      this.context.router.history.push('/app/lobby')
    }, 250)
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  render() {
    const currentRoom = _.find(this.props.rooms, { 'id': this.props.match.params.roomId })
    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          transition={<Slide direction="up" />}
        >
          <AppBar position="static">
            <Toolbar>
              <IconButton color="contrast" onClick={this.handleRequestClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography type="title" color="inherit">
                {currentRoom.title}
              </Typography>
            </Toolbar>
          </AppBar>
        </Dialog>
      </div>
    )
  }
}

Room.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    room: state.room,
    rooms: state.rooms
  }
}

export default connect(mapStateToProps, null)(Room)