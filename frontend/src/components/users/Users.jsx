import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Profile from './Profile';
import RandomUser from './RandomUser';
import EditProfile from './EditProfile'


class Users extends Component {
  render() {
    const { currentUser } = this.props
    console.log('Hello Users Component!');
    console.log(currentUser);
    return (
      <Switch>
        <Route exact path='/users/random' component={RandomUser} />
        <Route exact path='/users/:username' render={(props) => <Profile {...props} currentUser={currentUser} />}/>
        <Route ecact path='/users/:username/edit' render={(props) => <EditProfile {...props} currentUser={currentUser} />}/>
      </Switch>
    );
  }
}

export default Users;
