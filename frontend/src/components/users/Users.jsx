import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Profile from './Profile';
import EditProfile from './EditProfile'


class Users extends Component {
  render() {
    const { currentUser } = this.props
    return (
      <Switch>
        <Route exact path='/users/:username' component={(props) => <Profile {...props} currentUser={currentUser} />}/>
        <Route path='/users/:username/edit' component={() => <EditProfile user={currentUser} />}/>
      </Switch>
    );
  }
}

export default Users;
