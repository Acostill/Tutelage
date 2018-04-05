import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Profile from './Profile';
import RandomUser from './RandomUser';
import EditProfile from './EditProfile'


class Users extends Component {
  render() {
    const { currentUser } = this.props
    console.log('Hello!')
    return (
      <Switch>
        <Route exact path='/users/random' component={RandomUser} />
        <Route exact path='/users/:username' component={(props) => <Profile {...props} currentUser={currentUser} />}/>
        <Route path='/users/:username/edit' component={() => <EditProfile user={currentUser} />}/>
      </Switch>
    );
  }
}

export default Users;
