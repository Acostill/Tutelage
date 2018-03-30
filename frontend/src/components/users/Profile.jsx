import React, { Component } from "react";
import axios from "axios";
import "../../css/Profile.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      userMessage: ""
    };
  }

  getUser = () => {
    let username = this.props.match.params.username;
    console.log('props:', this.props)
    console.log('I AM BEING CALLED')
    axios
      .get(`/users/getuser/${username}`)
      .then(res => {
        let user = res.data.user;
        console.log('user:', user)
        console.log('response: ', res)
        this.setState({
          user: user
        });
      })
      .catch(err => {
        console.log("Your shit ain't work:", err)
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
    });
  };

  clearMessage = () => {
    this.setState({
      userMessage: ""
    });
  };

  render() {
    const { user, userMessage } = this.state;
    console.log("useree", this.state.user)
    const { clearMessage, handleTextarea } = this;

    let commonInterests = "";

    return (
      <div id="user-profile" className="margin">
        <div className="background-banner">
          <div className="sq2" />
          <div id="user-banner">
            <div className="image-crop margin">
              <img
                src={user.imgurl}
                alt="profile picture"
                className="img-profile"
              />
            </div>
            <div id="user-basic-info">
              <h1 className="user-header">
                <strong>{`${user.firstname} ${user.lastname}`}</strong>
              </h1>
              <h3> Male/Female {user.gender} </h3>
              <h3> 90210 {user.location} </h3>
              <h3> Software Developer {user.occupation} </h3>
            </div>
          </div>
        </div>

        <div className="user-info-content">
          <div className="margin-top">Common Interests: {commonInterests}</div>
          <div className="margin-top"> Hobbies: {user.hobbies} </div>
          <div className="margin-top"> Bio: {user.bio} </div>
          <div className="margin-top margin-bottom"> Credentials: {user.credentials} </div>
        </div>

        <div className="center">
        <div id="chat-box" className="margin-top">
          <label>
            <h2> Let's connect: </h2>
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
