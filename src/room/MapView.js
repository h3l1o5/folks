import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'

import { sendPosition } from '../actions/currentRoomActions'
import Map from './Map'

import './MapView.css'

class MapView extends Component {
  state = {
    markers: this.props.currentRoom.members,
  }

  componentDidMount() {
    const { socket, currentRoom, user, sendPosition } = this.props
    if (navigator.geolocation) {
      this.watchPos = navigator.geolocation.watchPosition(position => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        if (currentPosition.lat && currentPosition.lng) {
          sendPosition(socket, currentRoom.id, user.username, currentPosition)
          this.setState({ markers: this.props.currentRoom.members })
        }
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const messagesNow = this.props.currentRoom.messages
    const messagesNext = nextProps.currentRoom.messages
    const markersNow = this.state.markers
    const markersNext = nextProps.currentRoom.members

    if (messagesNow !== messagesNext) {
      this.bindMarkerWithMessage(messagesNext[messagesNext.length - 1])
    }

    if (markersNow !== markersNext) {
      this.setState({ markers: nextProps.currentRoom.members })
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchPos)
  }

  bindMarkerWithMessage = message => {
    if (!this.timers) {
      this.timers = {}
    }
    clearTimeout(this.timers[message.createBy])

    const newMarkers = [...this.state.markers]
    const targetMarkerIndex = _.findIndex(newMarkers, {
      username: message.createBy,
    })
    newMarkers[targetMarkerIndex].showInfoWindow = true
    newMarkers[targetMarkerIndex].infoWindowContent = message.content
    this.setState({ markers: newMarkers })

    this.timers[message.createBy] = setTimeout(() => {
      const newMarkers = [...this.state.markers]
      const targetMarkerIndex = _.findIndex(newMarkers, {
        username: message.createBy,
      })
      newMarkers[targetMarkerIndex].showInfoWindow = false
      newMarkers[targetMarkerIndex].infoWindowContent = null
      this.setState({ markers: newMarkers })
    }, 3000)
  }

  render() {
    return (
      <Map
        containerElement={<div className="containerElement" />}
        mapElement={<div className="mapElement" />}
        markers={this.state.markers}
        newestMessage={this.state.newestMessage}
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
