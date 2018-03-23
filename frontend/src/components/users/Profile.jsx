import React, { Component } from 'react';
import axios from 'axios';
import Inbox from './Inbox';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    }
  }

  getUser = () => {

    let username = this.props.match.params.profile;
    console.log({username})
    axios.get(`/users/getuser/${username}`)
      .then(res => {
        let user = res.data.user
        this.setState({
          user: user
        })
      })
      .catch(err => {
        this.setState({
          message: err
        })
      })
  }

  componentDidMount() {
    this.getUser()
  }

  render() {
    const { user } = this.state;
    console.log({ user })

    let commonInterests = '';

    return (
      <div>
        <Inbox />
        <div className="imageHeader" >
          <img src={user.imgurl} alt="profile picture" />
          {`${user.firstname} ${user.lastname}`}
        </div>
        <div>
          {user.location}
          {user.gender}
          {user.occupation}
          Common Interests: {commonInterests}
          Hobbies: {user.hobbies}
          Bio: {user.bio}
          {user.credentials}
        </div>
      </div>
    )
  }
}

export default Profile;