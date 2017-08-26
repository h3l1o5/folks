import React, { Component } from 'react'
import { connect } from 'react-redux'

import RoomCard from './RoomCard'
import { getRoomsFromServer } from '../actions/roomsActions'

import './RoomCardList.css'

class RoomCardList extends Component {
  componentWillMount() {
    this.props.getRoomsFromServer()
  }

  render() {
    const rooms = this.props.rooms.map((room) => (
      <RoomCard key={room._id} title={room.title} createBy={room.createBy} createAt={room.createAt} />
    ))
    return (
      <div className="roomCardList">
        {rooms}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms
  }
}

export default connect(mapStateToProps, { getRoomsFromServer })(RoomCardList)