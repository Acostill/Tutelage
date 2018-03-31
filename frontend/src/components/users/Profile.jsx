import React, { Component } from "react";
import axios from "axios";
import "../../css/Profile.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profileUser: {},
      userMessage: ""
    };
  }

  getProfileUser = () => {
    let username = this.props.match.params.username;
    axios
      .get(`/users/getuser/${username}`)
      .then(res => {
        let profileUser = res.data.user;
        this.setState({
          profileUser: profileUser
        });
      })
      .catch(err => {
        this.setState({
          message: err
        });
      });
  };

  componentDidMount() {
    this.getProfileUser();
  }

  handleTextarea = e => {
    this.setState({
      userMessage: e.target.value
    });
  };

  clearMessage = () => {
    this.setState({
      userMessage: ""
    });
  };

  render() {
    const { clearMessage, handleTextarea } = this;
    const { profileUser, userMessage } = this.state;
    const { user } = this.props;

    let commonInterests = "";

    return (
      <div id="user-profile" className="margin">
        <div className="background-banner">
          <div id="user-banner">
            <div className="image-crop margin">
              <img src={profileUser.imgurl} alt="profile picture" className="img" />
            </div>
            <div id="user-basic-info">
              <h1 className="user-header">
                {`${profileUser.firstname} ${profileUser.lastname}`}
              </h1>
              <h3> gender: {profileUser.gender} </h3>
              <h3> location: {profileUser.location} </h3>
              <h3> occupation: {profileUser.occupation} </h3>
            </div>
          </div>
        </div>
          
        <div className="user-info-content">
          <div id="quick-user-info" className="margin-top">
            <div> location: {profileUser.location} </div>
            <div> gender: {profileUser.gender} </div>
            <div> occupation: {profileUser.occupation} </div>
          </div>
          <div className="margin-top">
            Common Interests: {commonInterests}
          </div>
          <div className="margin-top"> Hobbies: {profileUser.hobbies} </div>
          <div className="margin-top"> Bio: {profileUser.bio} </div>
          <div className="margin-top"> Credentials: {profileUser.credentials} </div>
        </div>

        <div className="background-banner orange-background">
          <div id="chat-box" className="margin-top">
            <label>
              <h2> Let's chat: </h2>
            </label>
            <textarea
              name="message"
              id="message-box"
              cols="30"
              rows="5"
              placeholder="Write your message here ..."
              value={userMessage}
              onChange={handleTextarea}
            />
            <div className="chat-buttons">
              <input
                type="submit"
                value="Submit Message"
                className="submit button-size"
              />
              <button className="clear button-size" onClick={clearMessage}>
                {" "}
                Clear{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
