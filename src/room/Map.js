import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import _ from 'lodash'

import { sendPosition } from '../actions/currentRoomActions'

import './Map.css'

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={8}
    defaultCenter={{ lat: 23.5, lng: 121.0 }}
    onClick={props.onMapClick}
    options={{ minZoom: 3 }}
  >
    {props.markers.map(marker => (
      <Marker
        key={marker.username}
        position={{
          lat: marker.lastPosition.lat,
          lng: marker.lastPosition.lng,
        }}
      />
    ))}
  </GoogleMap>
))

class Map extends Component {
  state = {
    currentPosition: {
      lat: 0,
      lng: 0,
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
        sendPosition(socket, currentRoom.id, user.username, currentPosition)
      })
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchPos)
  }

  render() {
    return (
      <GettingStartedGoogleMap
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

Map.propTypes = {
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

export default connect(mapStateToProps, { sendPosition })(Map)
