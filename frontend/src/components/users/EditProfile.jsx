import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Select from "./Select";
import "../../css/EditProfile.css";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";
import cloudinary from "cloudinary-core";
const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: "tutelage" });

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      public_id: this.props.user.public_id,
      userMessage: "",
      newUserName: this.props.user.username,
      newFirstName: this.props.user.firstname,
      newLastName: this.props.user.lastname,
      newEmail: this.props.user.email,
      newIsmentor: this.props.user.ismentor,
      newAge: this.props.user.age,
      newBio: this.props.user.bio,
      newOccupation: this.props.user.occupation,
      newZipcode: this.props.user.zipcode,
      newGender: this.props.user.gender,
      newImgURL: this.props.user.imgurl,
      newHobbies: this.props.user.hobbies,
      newCredentials: this.props.user.credentials,
      gender: "",
      doneEditing: false
    };

    this.areasOfExpertise = [
      "Business",
      "Design",
      "Engineer",
      "Development",
      "Entrepreneur",
      "Social Services"
    ];
  }

  makeWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: "tutelage",
        upload_preset: "wpcjhnmk",
        tags: ["users", "tutelage"]
      },
      (error, result) => {
        result.map(elem => {
          if (!elem.public_id) {
            return "sample";
          } else {
            console.log("elemmmm:", elem);
            console.log("REZULTTT img of make widget:", result);
            console.log("the public_ID:", result[0].public_id);
            console.log("the url:", result[0].url);
            this.setState({
              newImgURL: result[0].url,
              public_id: result[0].public_id
            });
          }
        });
      }
    );
  };

  getUser = () => {
    let username = this.props.user.username;
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

  handleTextArea = e => {
    this.setState({
      userMessage: e.target.value
    });
  };

  clearMessage = () => {
    this.setState({
      userMessage: ""
    });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRadioChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSelect = e => {
    this.setState({
      newOccupation: e.target.value
    });
  };

  editProfileSubmitForm = e => {
    e.preventDefault();
    e.stopPropagation();
    const { user } = this.props;

    //finish defining vars from state
    let {
      newUserName,
      newFirstName,
      newLastName,
      newEmail,
      newIsmentor,
      newAge,
      newBio,
      newOccupation,
      newZipcode,
      newGender,
      newImgURL,
      gender,
      newHobbies,
      newCredentials,
      public_id
    } = this.state;

    axios
      .patch("/users/edit", {
        username: newUserName,
        firstname: newFirstName,
        lastname: newLastName,
        email: newEmail,
        ismentor: newIsmentor,
        age: newAge,
        bio: newBio,
        occupation: newOccupation,
        zipcode: newZipcode,
        gender: gender === "Male" ? "Male" : "Female",
        imgurl: newImgURL,
        hobbies: newHobbies,
        credentials: newCredentials,
        public_id: public_id
      })
      .then(res => {
        this.setState({
          message: "User Profile updated!"
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          message: "Error updating profile"
        });
      });
  };

  fireRedirect = () => {
    const { doneEditing } = this.state;
    setTimeout(() => {
      this.setState({
        doneEditing: !this.state.doneEditing
      });
    }, 10);
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    const {
      clearMessage,
      handleTextArea,
      handleInputChange,
      handleRadioChange,
      handleSelect,
      editProfileSubmitForm,
      fireRedirect,
      areasOfExpertise,
      makeWidget
    } = this;
    const {
      user,
      userMessage,
      newUserName,
      newFirstName,
      newLastName,
      newEmail,
      newIsmentor,
      newAge,
      newBio,
      occupation,
      newZipcode,
      newGender,
      newImgURL,
      hobbies,
      credentials,
      doneEditing,
      public_id
    } = this.state;

    let Interests = "";

    if (doneEditing) {
      window.location.reload();
      return <Redirect to={`/users/${user.username}`} />;
    }
    return (
      <div id="user-profile" className="margin">
        <form onSubmit={editProfileSubmitForm} id="input-container">
          <div className="background-banner">
            <div id="user-banner">
              <div className="image-crop margin">
                {this.state.public_id ? (
                  <button id="upload_widget_opener" onClick={makeWidget}>
                    <Image
                      cloudName="tutelage"
                      publicId={this.state.public_id}
                      width="300"
                      crop="scale"
                    />
                  </button>
                ) : (
                  <button id="upload_widget_opener" onClick={makeWidget}>
                    <Image
                      cloudName="tutelage"
                      publicId={"defaultpic"}
                      width="300"
                      crop="scale"
                    />
                  </button>
                )}
              </div>
              <div id="user-basic-info">
                <h1 className="user-header">
                  {`${user.firstname} ${user.lastname}`}
                  <input
                    type="text"
                    placeholder="First Name"
                    name="newFirstName"
                    value={newFirstName}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="newLastName"
                    value={newLastName}
                    onChange={handleInputChange}
                  />
                </h1>
                <h3> Gender: {user.gender} </h3>
                <h3> Zipcode: {user.zipcode} </h3>
                <h3> Occupation: {user.occupation} </h3>
                {/* <input
                  type="text"
                  name="imgURL"
                  placeholder="Link of Image"
                  value={newImgURL}
                  onChange={handleInputChange}
                /> */}
              </div>
            </div>
          </div>

          <div className="user-info-content">
            <div id="quick-user-info" className="margin-top">
              <div> Zipcode: {user.zipcode} </div>
              <input
                type="text"
                placeholder="Zipcode"
                name="newZipcode"
                value={newZipcode}
                onChange={handleInputChange}
              />
              <div>
                {" "}
                Gender: {user.gender}
                <br />
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleRadioChange}
                />{" "}
                Male{" "}
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleRadioChange}
                />{" "}
                Female{" "}
              </div>
              <div> Occupation: {user.occupation} </div>
              <Select
                values={areasOfExpertise}
                selectedValue={occupation}
                handleSelect={handleSelect}
              />
              {/* <input
                type="text"
                placeholder="Occupation"
                name="newOccupation"
                value={occupation}
                onChange={handleInputChange}
              /> */}
            </div>
            <div className="margin-top">Interests: {Interests} </div>
            Hobbies: {user.hobbies}
            <input
              type="text"
              placeholder="hobbies"
              name="newHobbies"
              value={hobbies}
              onChange={handleInputChange}
            />
            Credentials: {user.credentials}
            <input
              type="text"
              placeholder="credentials"
              name="newCredentials"
              value={credentials}
              onChange={handleInputChange}
            />
            <div className="margin-top"> Bio: {user.bio} </div>
            <input
              type="text"
              placeholder="Bio"
              name="newBio"
              value={newBio}
              onChange={handleInputChange}
            />
          </div>
          <input type="submit" onClick={fireRedirect} />
        </form>
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
              onChange={handleTextArea}
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

export default EditProfile;
