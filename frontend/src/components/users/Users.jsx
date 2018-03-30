import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Profile from './Profile';
import EditProfile from './EditProfile'

class Users extends Component {

  render() {
    console.log('Hello!')
    return (
      <Switch>
        <Route exact path='/users/:username' component={Profile}/>
        <Route path='/users/:username/edit' component={EditProfile}/>
      </Switch>
    )
  }
}

export default Users;