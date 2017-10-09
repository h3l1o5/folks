import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import './Message.css'

const Message = props => {
  const { createBy, createAt, content } = props
  const formattedDate = moment(Number(createAt)).format(
    'YYYY-MM-DD // h:mm:ss a'
  )
  if (createBy === 'system') {
    return (
      <div className="systemMessage">
        <div className="header">{formattedDate}</div>
        <div className="content">{content}</div>
      </div>
    )
  }
  return (
    <div className="message">
      <div className="avatar" style={{ backgroundColor: '#654321' }} />
      <div className="body">
        <div className="header">
          {createBy} <span>{formattedDate}</span>
        </div>
        <div className="content">{content}</div>
      </div>
    </div>
  )
}

Message.propTypes = {
  createBy: PropTypes.string.isRequired,
  createAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default Message
