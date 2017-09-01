import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import _ from 'lodash'

import './Map.css'

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
    center={props.currentLocation}
    onClick={props.onMapClick}
    options={{ minZoom: 3 }}
  >
    <Marker position={props.currentLocation} />
  </GoogleMap>
))

class Map extends Component {
  state = {
    currentLocation: {
      lat: 0,
      lng: 0,
    },
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        this.setState({ currentLocation })
      })
    }
  }

  render() {
    return (
      <GettingStartedGoogleMap
        containerElement={<div className="containerElement" />}
        mapElement={<div className="mapElement" />}
        onMapLoad={_.noop}
        onMapClick={_.noop}
        markers={[]}
        onMarkerRightClick={_.noop}
        currentLocation={this.state.currentLocation}
      />
    )
  }
}

export default Map
