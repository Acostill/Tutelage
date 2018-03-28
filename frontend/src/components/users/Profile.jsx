import React, { Component } from "react";
import axios from "axios";
import "../../css/Profile.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      userMessage: '',
    };
  }

  getUser = () => {
    let username = this.props.match.params.username;
    console.log({ username });
    axios
      .get(`/users/getuser/${username}`)
      .then(res => {
        let user = res.data.user;
        this.setState({
          user: user
        });
      })
      .catch(err => {
        this.setState({
          message: err
        });
      });
  };

  componentDidMount() {
    this.getUser();
  }

  handleTextarea = e => {
    this.setState({
      userMessage: e.target.value
    })
  }

  clearMessage = () => {
    this.setState({
      userMessage: ""
    })
  }

  render() {
    const { user, userMessage } = this.state;
    console.log({ user });
    const { clearMessage, handleTextarea } = this;

    let commonInterests = "";

    return (
      <div id="user-profile">
        <div className="img-banner">
          <div className="image-header-container">
            <img src={user.imgurl} alt="profile picture" className="img" />
          </div>
          <h1 className="user-header">
            {`${user.firstname} ${user.lastname}`}
          </h1>
        </div>
          
        <div className="user-info-content">
          <div id="quick-user-info" className="margin-top">
            <div> location: {user.location} </div>
            <div> gender: {user.gender} </div>
            <div> occupation: {user.occupation} </div>
          </div>
          <div className="margin-top">
            Common Interests: {commonInterests}
          </div>
          <div className="margin-top"> Hobbies: {user.hobbies} </div>
          <div className="margin-top"> Bio: {user.bio} </div>
          <div className="margin-top"> Credentials: {user.credentials} </div>
        </div>

        <div id="chat-box" className="margin-top">
          <label>
            <h2> Let's chat: </h2>
          </label>
          <textarea name="message" id="message-box" cols="30" rows="5" placeholder="Write your message here ..." value={userMessage} onChange={handleTextarea} ></textarea>
          <div className="chat-buttons">
            <input type="submit" value="Submit Message" className="submit button-size"/>
            <button className="clear button-size" onClick={ clearMessage }> Clear </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
