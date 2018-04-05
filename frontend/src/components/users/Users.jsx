import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Profile from './Profile';
import EditProfile from './EditProfile'


class Users extends Component {
  render() {
    const { currentUser } = this.props
    return (
      <Switch>
<<<<<<< HEAD
        <Route exact path='/users/:username' component={(props) => <Profile {...props} currentUser={currentUser} />}/>
        <Route path='/users/:username/edit' component={() => <EditProfile user={currentUser} />}/>
=======
        <Route exact path='/users/random' component={RandomUser} />
        <Route exact path='/users/:username' render={(props) => <Profile {...props} currentUser={currentUser} />}/>
        <Route exact path='/users/:username/edit' render={(props) => <EditProfile {...props} currentUser={currentUser} />}/>
>>>>>>> 6d9c038fdb8b686014ba6a3f7fedef576c49d4ad
      </Switch>
    );
  }
}

export default Users;
