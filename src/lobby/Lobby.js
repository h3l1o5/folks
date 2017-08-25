import React, { Component } from 'react'

import RoomCardList from './RoomCardList'

import './Lobby.css'

class Lobby extends Component {
  render() {
    return (
      <div className="lobby">
        <RoomCardList />
      </div>
    )
  }
}

export default Lobby