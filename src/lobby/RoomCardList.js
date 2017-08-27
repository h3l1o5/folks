import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'

import RoomCard from './RoomCard'
import { getRoomsFromServer, addMember } from '../actions/roomsActions'

import './RoomCardList.css'

class RoomCardList extends Component {
  componentWillMount() {
    this.props.getRoomsFromServer()
  }

  checkRole = (room) => {
    if (room.createBy === this.props.user.username) {
      return 'owner'
    }
    if(_.find(room.members, (member) => {
      return member === this.props.user.username
    })) {
      return 'member'
    } else {
      return ''
    }
  }

  handleJoin = (roomId) => {
    this.props.addMember(roomId, this.props.user.username)
  }

  render() {
    const rooms = this.props.rooms.map((room) => {
      const dateFormate = moment(new Date(room.createAt)).format('YYYY-M-D, h:mm:ss a')
      const role = this.checkRole(room)
      return (
        <RoomCard 
          key={room.id} 
          id={room.id}
          title={room.title} 
          createBy={room.createBy} 
          createAt={dateFormate} 
          role={role}
          onJoin={this.handleJoin}
        />
      )
    })
    return (
      <div className="roomCardList">
        {rooms}
      </div>
    )
  }
}

RoomCardList.propTypes = {
  rooms: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  getRoomsFromServer: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { getRoomsFromServer, addMember })(RoomCardList)