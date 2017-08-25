import React, { Component } from 'react'

import './RoomCard.css'

class RoomCard extends Component {
  render() {
    return (
      <div className="roomCard">
        {this.props.title}
      </div>
    )
  }
}

export default RoomCard