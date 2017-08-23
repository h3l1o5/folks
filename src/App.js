import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoginPage from './login/LoginPage';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">LOBBY</Link></li>
          <li><Link to="/login">LOGIN</Link></li>
          <li><Link to="/signup">SIGNUP</Link></li>
        </ul>
        {routes}
      </div>
    );
  }
}

export default App;