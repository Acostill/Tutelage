import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "../../css/Profile.css";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";
import cloudinary from "cloudinary-core";
const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: "tutelage" });

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileUser: {},
      userMessage: "",
      showChatBox: false
    };
  }

  makeWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: "tutelage",
        public_id: "newUser",
        upload_preset: "wpcjhnmk",
        tags: ["users"]
      },
      function(error, result) {
        console.log(result);
      }
    );
  };

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
        console.log("Your shit ain't work:", err);
        this.setState({
          message: err
        });
      });
  };

  getPhotos = () => {
    axios.get("http://res.cloudinary.com/tutelage").then(res => {
      console.log(res);
      // this.setState({gallery: res.data.resources});
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

  checkReload = () => {
    if (this.props.match.params.username !== this.state.profileUser.username) {
      this.getProfileUser();
    }
  };

  showChatBoxHandle = () => {
    const {showChatBox} = this.state;
    this.setState({
      showChatBox: !showChatBox
    });
  }

  render() {
    const { clearMessage, handleTextarea, checkReload, showChatBoxHandle } = this;
    const { profileUser, userMessage, showChatBox } = this.state;
    const { user } = this.props;
    let currentURL = this.props.match.url
    console.log("THIS.PROPS...SMH", this.props)
    console.log("profiel USER:::", profileUser)
    console.log("profiel USER occupaion:::", profileUser.occupation)
    let commonInterests = "";

    checkReload();
    return (
      <div id="user-profile" className="margin">
        <div className="background-banner">
          <div className="sq2" />
          <div id="user-banner">
            { 
            <div className="image-crop margin">
              <Link to = {`/users/${profileUser.username}/edit`} refresh = "true"> 
                <img
                  src={profileUser.imgurl}
                  alt="profile picture"
                  className="img-profile"
                /> 
              </Link>
            </div>
            }
            <div id="user-basic-info">
              <h1 className="user-header">
                <strong>{`${profileUser.firstname} ${
                  profileUser.lastname
                }`}
                </strong>
              </h1>
              <h3> {profileUser.gender} </h3>
              <h3> gender: {profileUser.gender} </h3>
              <h3> zipcode: {profileUser.zipcode} </h3>
              <h3> Occupation: {profileUser.occupation} </h3>
              {/* <Link to='/survey'>Click here to edit your survey questions</Link> */}
            </div>
          </div>
        </div>

        <div className="user-info-content">
          <div id="quick-user-info" >
          <div className="margin-top">Interests: {profileUser.commonInterests}</div>
          <div className="margin-top"> Hobbies: {profileUser.hobbies} </div>
          <div className="margin-top"> Bio: {profileUser.bio}</div>
          </div>
          <div className="margin-top">
            Credentials: {profileUser.credentials}{" "}
          </div>
        </div>
        {/* Chat box will display once they click Let's talk */}
        { showChatBox ? 
        (<div className="center">
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
        </div>) : (
          <div className="center-chatbox">
            <button 
            className="submit button-size"
            onClick={showChatBoxHandle}
            > Let's Talk!
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
