import React, { Component } from 'react'

import RoomCard from './RoomCard'

import './RoomCardList.css'

class RoomCardList extends Component {
  render() {
    return (
      <div className="roomCardList">
        <RoomCard title='room1' />
        <RoomCard title='room2' />
        <RoomCard title='room3' />
        <RoomCard title='room4' />     
        <RoomCard title='room5' />        
        <RoomCard title='room6' />        
      </div>
    )
  }
}

export default RoomCardList