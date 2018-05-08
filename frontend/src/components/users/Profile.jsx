import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "../../css/Profile.css";
// import "../../css/EditProfile.css";
import UserProfile from "./UserProfile";
import Swal from "sweetalert2";

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
      subject: "",
      userMessage: "",
      showChatBox: false,
      interests: [],
      currentUserInterests: []
    };
  }

  // makeWidget = () => {
  //   window.cloudinary.openUploadWidget(
  //     {
  //       cloud_name: "tutelage",
  //       public_id: "newUser",
  //       upload_preset: "wpcjhnmk",
  //       tags: ["users"]
  //     },
  //     function(error, result) {
  //       console.log(result);
  //     }
  //   );
  // };

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
      .then(() => {
        this.getInterests();
      })
      .catch(err => {
        this.setState({
          message: err
        });
      });
  };

  // getPhotos = () => {
  //   axios.get("http://res.cloudinary.com/tutelage").then(res => {
  //     console.log(res);
  //     // this.setState({gallery: res.data.resources});
  //   });
  // };

  handleTextarea = e => {
    this.setState({
      userMessage: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { profileUser, userMessage } = this.state;
    let { currentUser } = this.props;
    console.log(currentUser);
    const subject = `Hey ${profileUser.firstname}, ${
      currentUser.firstname
    } wants to chat!`;
    axios
      .post("/users/fetch_new_thread", {
        username2: profileUser.username,
        subject: subject
      })
      .then(res => {
        console.log("returned ID", res.data.thread.id);
        let thread_id = res.data.thread.id;
        axios.post("/users/send_message", {
          thread_id: thread_id,
          body: userMessage
        });
      });

    Swal({
      title: `🎉 Congratulations ${
        currentUser.firstname
      }, you just sent a message to ${profileUser.firstname}.
        Allow time for ${profileUser.firstname} to respond.`,
      width: 600,
      padding: 100,
      background: `#fff`,
      confirmButtonText: `OK`,
      confirmButtonColor: `#FD8F26`
    });
  };

  cancelMessage = () => {
    this.setState({
      userMessage: "",
      showChatBox: false
    });
  };

  checkReload = () => {
    if (this.props.match.params.username !== this.state.profileUser.username) {
      this.getProfileUser();
    }
  };

  showChatBoxHandle = () => {
    const { showChatBox } = this.state;
    this.setState({
      showChatBox: !showChatBox
    });
  };

  getInterests = () => {
    let { profileUser } = this.state;
    axios
      .post("/users/interests", { username: profileUser.username })
      .then(res => {
        this.setState({
          interests: res.data.interests
        });
      });
  };

  componentDidMount() {
    const { getProfileUser, getInterests } = this;
    getProfileUser();
  }

  render() {
    const {
      cancelMessage,
      handleTextarea,
      checkReload,
      showChatBoxHandle,
      renderProfile,
      handleSubmit
    } = this;

    let { profileUser, userMessage, showChatBox, interests } = this.state;
    let { currentUser } = this.props;

    // let currentURL = this.props.match.url;
    profileUser = { ...profileUser, interests };
    
    let commonInterests = currentUser.interests
      ? profileUser.interests.filter(interest =>
          currentUser.interests.includes(interest)
        )
      : ["Loading"];
    if (
      currentUser.interests &&
      profileUser.interests &&
      commonInterests.length === 0
    )
      commonInterests = ["Nothing in common"];
    let isCurrentUserProfile = currentUser.id === profileUser.id;
    console.log({ commonInterests });
    checkReload();
    return (
      <div id="edit-user-profile-container">
        {isCurrentUserProfile ? (
          <UserProfile currentUser={currentUser} />
        ) : (
          <div id="user-profile" className="margin">
            <div className="background-banner">
              <div className="color-sq2" />
              <div id="user-banner">
                {/* mine */}
                <div className="user-pic-info">
                  <div className="image-crop margin">
                    <Link
                      to={`/users/${profileUser.username}/edit`}
                      title="Click to edit Profile."
                    >
                      {profileUser.public_id ? (
                        <Image
                          className="img-profile"
                          cloudName="tutelage"
                          publicId={profileUser.public_id + ".jpg"}
                          crop="scale"
                          /*width="300"  */
                        />
                      ) : (
                        <img
                          src={profileUser.imgurl}
                          alt="profile picture"
                          className="img-profile"
                        />
                      )}
                    </Link>
                  </div>
                  <div id="user-basic-info">
                    <div>
                      <h1 className="user-header-name">
                        <strong>
                          {`${profileUser.firstname} ${profileUser.lastname}`}
                        </strong>
                      </h1>

                      <h3> {profileUser.gender} </h3>
                      <h3> Zipcode: {profileUser.zipcode} </h3>
                      <h3> Occupation: {profileUser.occupation} </h3>
                      {/* <Link to='/survey'>Click here to edit your survey questions</Link> */}
                    </div>
                  </div>
                </div>
                <div className="box-two">
                  <div className="user-info-content" id="on-profile">
                    <div id="quick-user-info">
                      <div className="margin-top">
                        <h2>
                          <strong>Common Interests</strong>
                        </h2>
                        {commonInterests.map(interest => (
                          <p className="interest">{interest}</p>
                        ))}
                      </div>
                      <div className="margin-top">
                        <h2>
                          <strong>Interests</strong>
                        </h2>
                        {profileUser.interests.map(interest => (
                          <p className="interest">{interest}</p>
                        ))}
                      </div>
                      <div className="margin-top">
                        {" "}
                        Hobbies: {profileUser.hobbies}{" "}
                      </div>
                      <div className="margin-top"> Bio: {profileUser.bio}</div>
                      <div className="margin-top">
                        Credentials: {profileUser.credentials}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Chat box will display once they click Let's talk */}
            {showChatBox ? (
              <div className="center margin">
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
                      onClick={handleSubmit}
                      className="submit button-size"
                    />
                    <button
                      className="clear button-size"
                      onClick={cancelMessage}
                    >
                      {" "}
                      Cancel{" "}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="center-chatbox">
                <button
                  className="submit button-size"
                  onClick={showChatBoxHandle}
                >
                  {" "}
                  Let's Talk!
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default Profile;
