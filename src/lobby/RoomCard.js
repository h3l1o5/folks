import React, { Component } from 'react'

import './RoomCard.css'

class RoomCard extends Component {
  render() {
    return (
      <div className="roomCard">
        <h3>{this.props.title}</h3>
        <h5>{this.props.createBy}</h5>
        <h5>{this.props.createAt}</h5>
      </div>
    )
  }
}

export default RoomCard