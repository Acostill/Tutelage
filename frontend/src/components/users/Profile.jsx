import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
  state = {
    user: {}
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

    let profilePic = 'http://www.diaglobal.org/_Images/member/Generic_Image_Missing-Profile.jpg';
    let fullName = 'John Cloud';
    let location = 'Mid Manhattan, NY';
    let gender = 'Male';
    let occupation = 'Full Stack Developer';
    let commonInterests = ['Basketball', 'CSS Enthusiast'];
    let hobbies = ['Basketball', 'CSS Enthusiast', 'Pottery Barn'];
    let bio = 'This is my bio';
    let credentials = ['C4Q Full Stack Fellowship', 'Front End Engineer at Esty', 'Front End Engineer at Blue Apron']
    return (
      <div>
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