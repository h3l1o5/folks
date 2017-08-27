import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Icon } from 'semantic-ui-react'
import './RoomCard.css'

class RoomCard extends Component {
  render() {
    return (
      <div className="roomCard">
        <div className="info" onClick={() => this.props.onEnter(this.props.id)} style={{cursor: 'pointer'}}>
          <h3>{this.props.title}</h3>
          <h5>{this.props.createBy}</h5>
          <h5>{this.props.createAt}</h5>
        </div>
        <div className="footer">
          <div className="joinButton">
            {this.props.role === 'owner' ? 
              <Button disabled size="mini"><Icon name='users' />OWNER</Button> :
              this.props.role === 'member' ?              
              <Button disabled size="mini"><Icon name='user' />MEMBER</Button> :
              <Button color="teal" size="mini" onClick={() => this.props.onJoin(this.props.id)}>JOIN</Button> 
            }
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
  createAt: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  onJoin: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
}

export default RoomCard