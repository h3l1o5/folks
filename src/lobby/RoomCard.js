import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Icon } from 'semantic-ui-react'
import './RoomCard.css'

class RoomCard extends Component {
  handleClick = () => {
    const { id, role, onEnter } = this.props
    if (role !== 'owner' && role !== 'member') {
      onEnter(false, id)
    } else {
      onEnter(true, id)
    }
  }

  render() {
    return (
      <div className="roomCard">
        <div
          className="main"
          role="button"
          tabIndex="0"
          onClick={this.handleClick}
        >
          <div className="picture">TODO</div>
          <div className="info">
            <div className="header">
              <div className="title">{this.props.title}</div>
              <div className="createBy">{this.props.createBy}</div>
            </div>
            <div className="TBD">TODO</div>
          </div>
        </div>
        <div className="footer">
          <div className="joinButton">
            {this.props.role === 'owner' ? (
              <Button disabled size="mini">
                <Icon name="users" />OWNER
              </Button>
            ) : this.props.role === 'member' ? (
              <Button disabled size="mini">
                <Icon name="user" />MEMBER
              </Button>
            ) : (
              <Button
                color="teal"
                size="mini"
                onClick={() => this.props.onJoin(this.props.id)}
              >
                JOIN
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

RoomCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createBy: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  onJoin: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
}

export default RoomCard
