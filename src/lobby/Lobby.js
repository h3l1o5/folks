import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Loader } from 'semantic-ui-react'
import RoomCardList from './RoomCardList'

import './Lobby.css'

class Lobby extends Component {
  render() {
    return (
      <div className="lobby">
        {this.props.isLoading ? <Loader active></Loader> : null}
        <RoomCardList />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.lobby.isLoading
  }
}

export default connect(mapStateToProps, null)(Lobby)