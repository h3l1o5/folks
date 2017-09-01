import React from 'react'
import PropTypes from 'prop-types'

import { Button, Icon } from 'semantic-ui-react'
import './RoomCard.css'

const RoomCard = props => (
  <div className="roomCard">
    <div
      className="main"
      role="button"
      tabIndex="0"
      onClick={() => props.onEnter(props.id)}
    >
      <div className="picture">TODO</div>
      <div className="info">
        <div className="header">
          <div className="title">{props.title}</div>
          <div className="createBy">{props.createBy}</div>
        </div>
        <div className="TBD">TODO</div>
      </div>
    </div>
    <div className="footer">
      <div className="joinButton">
        {props.role === 'owner' ? (
          <Button disabled size="mini">
            <Icon name="users" />OWNER
          </Button>
        ) : props.role === 'member' ? (
          <Button disabled size="mini">
            <Icon name="user" />MEMBER
          </Button>
        ) : (
          <Button
            color="teal"
            size="mini"
            onClick={() => props.onJoin(props.id)}
          >
            JOIN
          </Button>
        )}
      </div>
    </div>
  </div>
)

RoomCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createBy: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  onJoin: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
}

export default RoomCard
