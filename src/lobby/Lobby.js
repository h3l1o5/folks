import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { Sidebar } from 'semantic-ui-react'
import Snackbar from 'material-ui/Snackbar'
import Header from './Header'
import SideMenu from './SideMenu'
import RoomCardList from './RoomCardList'
import AddRoomModal from './AddRoomModal'
import { setShowAddRoomModal, setSnackBar } from '../actions/lobbyActions'
import { getRoomsFromServer } from '../actions/roomsActions'

import './Lobby.css'

class Lobby extends Component {
  componentDidMount() {
    this.props.getRoomsFromServer()
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
    const { showAddRoomModal, showSideMenu, setSnackBar, snackBar } = this.props
    return (
      <div className="lobby">
        <Header />
        <Sidebar.Pushable>
          <SideMenu visible={showSideMenu} />
          <Sidebar.Pusher>
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionAppear
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              <RoomCardList />
            </ReactCSSTransitionGroup>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <AddRoomModal
          show={showAddRoomModal}
          onClose={this.handleAddRoomModalClose}
          onSubmit={this.handleAddRoomModalSubmit}
        />
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={snackBar.open}
          message={
            <span id="message" style={{ color: snackBar.color }}>
              {snackBar.message}
            </span>
          }
          onRequestClose={() => setSnackBar({ open: false })}
          autoHideDuration={2000}
        />
      </div>
    )
  }
}

Lobby.propTypes = {
  showAddRoomModal: PropTypes.bool.isRequired,
  showSideMenu: PropTypes.bool.isRequired,
  snackBar: PropTypes.object.isRequired,
  setShowAddRoomModal: PropTypes.func.isRequired,
  getRoomsFromServer: PropTypes.func.isRequired,
  setSnackBar: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  showAddRoomModal: state.lobby.showAddRoomModal,
  showSideMenu: state.lobby.showSideMenu,
  snackBar: state.lobby.snackBar,
  socket: state.auth.socket,
})

export default connect(mapStateToProps, {
  setShowAddRoomModal,
  getRoomsFromServer,
  setSnackBar,
})(Lobby)
