import React from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

import icon from '../icons/DonaldTrump.png'

import './Map.css'

const Map = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 23.5, lng: 121.0 }}
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
      >
        {marker.showInfoWindow && (
          <InfoWindow options={{ maxWidth: 200 }}>
            <div className="infoWindowContent">{marker.infoWindowContent}</div>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
))

export default Map
