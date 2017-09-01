import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'

import RoomCard from './RoomCard'
import { getRoomsFromServer, addMember } from '../actions/roomsActions'

import './RoomCardList.css'

class RoomCardList extends Component {
  componentDidMount() {
    this.props.getRoomsFromServer()
  }

  checkRole = room => {
    if (room.createBy === this.props.user.username) {
      return 'owner'
    }
    if (_.find(room.members, member => member === this.props.user.username)) {
      return 'member'
    }
    return ''
  }

  handleJoinRoom = roomId => {
    this.props.addMember(roomId, this.props.user.username)
  }

  handlEnterRoom = roomId => {
    this.context.router.history.push(`/app/room/${roomId}`)
  }

  render() {
    const rooms = this.props.rooms.map(room => {
      const dateFormate = moment(Number(room.createAt)).format(
        'YYYY-M-D, h:mm:ss a',
      )
      const role = this.checkRole(room)
      return (
        <RoomCard
          key={room.id}
          id={room.id}
          title={room.title}
          createBy={room.createBy}
          createAt={dateFormate}
          role={role}
          onJoin={this.handleJoinRoom}
          onEnter={this.handlEnterRoom}
        />
      )
    })
    return <div className="roomCardList">{rooms}</div>
  }
}

RoomCardList.contextTypes = {
  router: PropTypes.object.isRequired,
}

RoomCardList.propTypes = {
  rooms: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  getRoomsFromServer: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  rooms: state.rooms,
  user: state.auth.user,
})

export default connect(mapStateToProps, {
  getRoomsFromServer,
  addMember,
})(RoomCardList)
