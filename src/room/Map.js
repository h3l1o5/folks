import React from 'react'

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import icon from '../icons/DonaldTrump.png'

const Map = withGoogleMap(props => (
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
          lat: Number(marker.lastPosition.lat),
          lng: Number(marker.lastPosition.lng),
        }}
        options={{ icon }}
      />
    ))}
  </GoogleMap>
))

export default Map
