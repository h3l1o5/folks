import React, { Component } from 'react'

import AppBar from './appBar/AppBar'
import routes from './routes'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppBar />
        {routes}
      </div>
    )
  }
}

export default App
