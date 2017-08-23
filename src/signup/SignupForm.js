import React, { Component } from 'react';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Username</label>
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
          <button type="submit">Signup</button>
        </div>
      </form>
    );
  }
}

export default SignupForm;