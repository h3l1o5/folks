import React, { Component } from 'react'

import './AppBar.css'

class AppBar extends Component {

  handleAddRoomClick = () => {
    console.log('123')
  }

  render() {
    return (
      <div className="appBar">
        <div className="brand">folks</div>
        <div className="addRoom">
          <i className="material-icons" onClick={this.handleAddRoomClick}>add</i>
        </div>
      </div>
    )
  }
}

export default AppBar