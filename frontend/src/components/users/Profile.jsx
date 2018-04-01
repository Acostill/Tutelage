import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "../../css/Profile.css";
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import cloudinary from 'cloudinary-core';
const cloudinaryCore = new cloudinary.Cloudinary({cloud_name: 'tutelage'});


class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      userMessage: ""
    };
  }
 
  makeWidget = () => {
    window.cloudinary.openUploadWidget( 
        { cloud_name: 'tutelage', public_id: 'newUser', upload_preset: 'wpcjhnmk', tags:['users']},
        function(error, result) {
          console.log(result);
        }
      );
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

  getPhotos = () => {
    axios.get
    ('http://res.cloudinary.com/tutelage')
            .then(res => {
                console.log(res);
                // this.setState({gallery: res.data.resources});
            })
    }

  componentDidMount() {
    this.getUser();
    // this.getPhotos();
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
           
            {/* <button id="upload_widget_opener" onClick = {this.makeWidget}> 
              <Image cloudName="tutelage" publicId="sample" width="300" crop="scale">
                <Transformation width="900" height="900" background="auto:predominant_gradient:6:palette_orange_white_orange_red_orange_black" crop="pad"/>
              </Image>
            </button> } */}
              <img src={user.imgurl} alt="profile picture" className="img-profile" />
            </div>
            <div id="user-basic-info">
              <h1 className="user-header">
                <strong>{`${user.firstname} ${user.lastname}`}</strong>
              </h1>
              <h3> Male/Female {user.gender} </h3>
              <h3> 90210 {user.location} </h3>
              <h3> Software Developer {user.occupation} </h3>
            {/* <Link to='/survey'>Click here to edit your survey questions</Link> */}
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
