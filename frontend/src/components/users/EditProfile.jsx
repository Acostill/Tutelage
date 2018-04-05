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
            <div className="sq2-edit" />
            <div id="user-banner-edit">
              <div className="image-crop margin">
                {this.state.public_id ? (
                  <button id="upload_widget_opener" onClick={makeWidget}>
                    <Image
                      cloudName="tutelage"
                      publicId={this.state.public_id}
                      width="250"
                      crop="scale"
                    />
                  </button>
                ) : (
                  <button id="upload_widget_opener" onClick={makeWidget}>
                    <Image
                      cloudName="tutelage"
                      publicId={"defaultpic"}
                      width="250"
                      crop="scale"
                    />
                  </button>
                )}
              </div>
                
              <div id="user-basic-info-edit">
                <div className="user-header-edit">
                  <div>
                    <input
                      type="text"
                      name="newFirstName"
                      value={newFirstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="input-box-edit"
                    />
                  </div>
                  <div className="margin-top">
                    <input
                      type="text"
                      name="newLastName"
                      value={newLastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="input-box-edit"
                    />
                  </div>
                  <div className="margin-top">
                    {"Link of Image:"}
                    <input
                      type="text"
                      name="imgURL"
                      value={newImgURL}
                      onChange={handleInputChange}
                      className="input-box-edit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="user-info-content">
            <div id="quick-user-info" >
              <div>
                {" "}
                Gender:
                {/* {user.gender} */}
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

              <div className="margin-top">
                Zipcode:
                <br />
                <input
                  type="text"
                  placeholder="Zipcode"
                  name="newZipcode"
                  value={newZipcode}
                  onChange={handleInputChange}
                  className="input-box-edit "
                />
              </div>

              <div className="margin-top"> Occupation: </div>
              <Select
                values={areasOfExpertise}
                selectedValue={occupation}
                handleSelect={handleSelect}
                className="margin-top"
              />
            </div>

            <div className="margin-top">Interests: {Interests}</div>

            <div className="margin-top">
              <textarea
                placeholder="Hobbies"
                cols="70"
                name="newHobbies"
                value={hobbies}
                onChange={handleInputChange}
                className="input-box-edit"
              />
            </div>
            <div className="margin-top">
              <textarea
                placeholder="Credentials"
                cols="70"
                name="newCredentials"
                value={credentials}
                onChange={handleInputChange}
                className="input-box-edit"
              />
            </div>
            <div className="margin-top">
              <textarea
                placeholder="Bio"
                cols="70"
                name="newBio"
                value={newBio}
                onChange={handleInputChange}
                className="input-box-edit"
              />
            </div>
            <input type="submit" onClick={fireRedirect} className="button-size submit center-submit"/>
          </div>
        </form>
</div>
    );
  }
}

export default EditProfile;
