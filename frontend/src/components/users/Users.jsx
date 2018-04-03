import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Profile from './Profile';
import RandomUser from './RandomUser';
import EditProfile from './EditProfile'
import RandomUser from './randomUsers';

class Users extends Component {
  render() {
    const { user } = this.props
    console.log('Hello!')
    return (
      <Switch>
<<<<<<< HEAD
        <Route exact path='/users/random' component={RandomUser}/>
=======
        <Route exact path='/users/random' component={RandomUser} />
>>>>>>> c5f5e2adf7148d9fdbfbc21f800097fb54069af8
        <Route exact path='/users/:username' component={Profile}/>
        <Route path='/users/:username/edit' component={() => <EditProfile user={user} />}/>
      </Switch>
    );
  }
}

export default Users;
