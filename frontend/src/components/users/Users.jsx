import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Profile from "./Profile";

class Users extends Component {
  render() {
    return (
      <Switch>
        <Route path="/users/:username" component={Profile} />
      </Switch>
    );
  }
}

export default Users;
