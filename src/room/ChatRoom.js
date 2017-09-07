import React from 'react'
import PropTypes from 'prop-types'

import MessageList from './MessageList'
import MessageForm from './MessageForm'

import './ChatRoom.css'

const ChatRoom = props => (
  <div className="ChatRoom">
    {props.currentRoom && <MessageList messages={props.currentRoom.messages} />}
    <MessageForm
      placeholder={`Message #${props.currentRoom.title}`}
      onSubmit={props.handleSubmit}
    />
  </div>
)

ChatRoom.defaultProps = {
  currentRoom: {},
}

ChatRoom.propTypes = {
  currentRoom: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default ChatRoom
