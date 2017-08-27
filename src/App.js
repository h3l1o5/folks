import React, { Component } from 'react'

import AppBar from './appBar/AppBar'
import routes from './routes'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppBar />
        <div className="appContent">
          {routes}
        </div>
      </div>
    )
  }
}

export default App
