import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "../../css/Profile.css";
import "../../css/EditProfile.css";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";
import cloudinary from "cloudinary-core";
const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: "tutelage" });

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: []
    };
  }

  getInterests = () => {
    let { currentUser } = this.props;
    axios
      .post('/users/interests', { username: currentUser.username })
      .then(res => {
        this.setState({
          interests: res.data.interests
        })
      })
  }

  componentDidMount() {
    // const { getInterests } = this;
    // getInterests();
  }

  render() {
    const {
      clearMessage,
      handleTextarea,
      checkReload,
      showChatBoxHandle
    } = this;
    // let { interests } = this.state;
    let { currentUser } = this.props;
    currentUser = { ...currentUser }
    // currentUser = { ...currentUser, interests: interests }
    // console.log({ interests })

    return (
      <div id="user-profile" className="margin">
        <div className="background-banner">
          <div className="color-sq2" />
          <div id="user-banner">
            <div className="user-pic-info">


              <div className="image-crop margin">
                <Link to={`/users/${currentUser.username}/edit`} title="Click to edit Profile.">
                  {currentUser.public_id ? (
                    <Image
                      className="img-profile"
                      cloudName="tutelage"
                      publicId={currentUser.public_id + ".jpg"}
                      crop="scale"
                    /*width="300"  */
                    />
                  ) : (

                      <img
                        src={currentUser.imgurl}
                        alt="profile picture"
                        className="img-profile"
                      />)}
                </Link>
              </div>

              <div id="user-basic-info">
                <div>
                  <h1 className="user-header-name" ><strong>
                    {`${currentUser.firstname} ${currentUser.lastname}`}
                  </strong></h1>

                  <h3> {currentUser.gender} </h3>
                  <h3> Zipcode: {currentUser.zipcode} </h3>
                  <h3> Occupation: {currentUser.occupation} </h3>
                  {/* <Link to='/survey'>Click here to edit your survey questions</Link> */}
                </div>
              </div>
            </div>
            <Link to={`/users/${currentUser.username}/edit`} >
              <button className="button-size submit" id="editButton" >Edit</button>
            </Link>
            <div className="box-two">
              <div className="user-info-content">
                <div id="quick-user-info">
                  {/* <div className="margin-top">
                    <h2><strong>Interests</strong></h2>
                    {currentUser.interests.map(interest =>
                      <p className='interest' >{interest}</p>
                    )}
                  </div> */}
                  <div className="margin-top">
                    {" "}
                    <h2><strong>Hobbies</strong></h2>
                    {currentUser.hobbies}{" "}
                  </div>
                  <div className="margin-top"> 
                    <h2><strong>Bio</strong></h2> 
                    {currentUser.bio}
                  </div>
                </div>
                <div className="margin-top">
                  <h2><strong>Credentials</strong></h2>
                  {currentUser.credentials}{" "}
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* Chat box will display once they click Let's talk */}
      </div>
    );
  }
}

export default UserProfile;
