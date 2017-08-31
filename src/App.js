import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getRoomsFromServer } from "./actions/roomsActions";
import AppBar from "./appBar/AppBar";
import routes from "./routes";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.getRoomsFromServer();
  }

  render() {
    return (
      <div className="app">
        <AppBar />
        <div className="appContent">{routes}</div>
      </div>
    );
  }
}

App.propTypes = {
  getRoomsFromServer: PropTypes.func.isRequired,
};

// react-router issue#4671
export default withRouter(connect(null, { getRoomsFromServer })(App));
