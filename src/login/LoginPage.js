import React, { Component } from 'react';

import LoginForm from './LoginForm';

class LoginPage extends Component { 
  render() {
    return (
      <div>
        <div>
          <h1>LOGIN</h1>
          <LoginForm />
          <button onClick={this.handleSignupClick}>Signup</button>
        </div>
      </div>
    );
  }
}

export default LoginPage;