import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'

import { sendPosition } from '../actions/currentRoomActions'
import Map from './Map'

import './MapView.css'

class MapView extends Component {
  state = {
    currentPosition: {
      lat: null,
      lng: null,
    },
  }

  componentDidMount() {
    const { socket, currentRoom, user, sendPosition } = this.props
    if (navigator.geolocation) {
      this.watchPos = navigator.geolocation.watchPosition(position => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        this.setState({ currentPosition })
        if (currentPosition.lat && currentPosition.lng) {
          sendPosition(socket, currentRoom.id, user.username, currentPosition)
        }
      })
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchPos)
  }

  render() {
    return (
      <Map
        containerElement={<div className="containerElement" />}
        mapElement={<div className="mapElement" />}
        onMapLoad={_.noop}
        onMapClick={_.noop}
        markers={this.props.currentRoom.members}
        onMarkerRightClick={_.noop}
        currentPosition={this.state.currentPosition}
      />
    )
  }
}

MapView.propTypes = {
  currentRoom: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  sendPosition: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  currentRoom: state.currentRoom,
  user: state.auth.user,
  socket: state.auth.socket,
})

export default connect(mapStateToProps, { sendPosition })(MapView)
