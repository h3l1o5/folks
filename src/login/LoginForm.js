import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label className="control-label">Username</label>
          <input 
            type="text" 
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input 
            type="password" 
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
}

export default LoginForm;