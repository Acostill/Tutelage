import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Profile from './Profile';
import EditProfile from './EditProfile'


class Users extends Component {
  render() {
    const { currentUser } = this.props
    return (
      <Switch>
        <Route exact path='/users/:username' render={(props) => <Profile {...props} currentUser={currentUser} />}/>
        <Route path='/users/:username/edit' render={(props) => <EditProfile {...props} currentUser={currentUser} />}/>
      </Switch>
    );
  }
}

export default Users;
