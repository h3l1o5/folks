import React, { Component } from 'react'
import moment from 'moment'

import './Message.css'

class Message extends Component {
  render() {
    const { createBy, createAt, content } = this.props
    const formattedDate = moment(Number(createAt)).format("YYYY-MM-DD // h:mm:ss a")
    const randomAvatarColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return (
      <div className="message">
        <div className="avatar" style={{'backgroundColor': '#654321' }}></div>
        <div className="body">
          <div className="header">{createBy} <span>{formattedDate}</span></div>
          <div className="content">
            {content}
          </div>
        </div>
      </div>
    )
  }
}

export default Message