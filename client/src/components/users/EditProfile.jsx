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
      public_id: this.props.currentUser.public_id,
      userMessage: "",
      newUserName: '',
      newFirstName: '',
      newLastName: '',
      newEmail: '',
      newIsmentor: '',
      newAge: '',
      newBio: '',
      newOccupation: '',
      newZipcode: '',
      newGender: '',
      newImgURL: '',
      newHobbies: '',
      newCredentials: '',
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
    let username = this.props.match.params.username;
    axios
      .get(`/users/getuser/${username}`)
      .then(res => {
        let currentUser = res.data.user;
        this.setState({
          currentUser: currentUser
        });
      })
      .catch(err => {
        this.setState({
          message: err
        });
      });
  };

  setUser = (currentUser) => {
    const { username, firstname, lastname, email,
      ismentor, age, bio, occupation, zipcode,
      gender, imgurl, hobbies, credentials } = currentUser;
    this.setState({
      currentUser: currentUser,
      newUserName: username,
      newFirstName: firstname,
      newLastName: lastname,
      newEmail: email,
      newIsmentor: ismentor,
      newAge: age,
      newBio: bio,
      newOccupation: occupation,
      newZipcode: zipcode,
      newGender: gender,
      newImgURL: imgurl,
      newHobbies: hobbies,
      newCredentials: credentials,
    })
  }
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
    // debugger;
    e.preventDefault();
    e.stopPropagation();
    let {
      currentUser,
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
        username: newUserName || currentUser.username,
        firstname: newFirstName || currentUser.firstname,
        lastname: newLastName || currentUser.lastname,
        email: newEmail || currentUser.email,
        ismentor: newIsmentor || currentUser.ismentor,
        age: newAge || currentUser.age,
        bio: newBio || currentUser.bio,
        occupation: newOccupation || currentUser.occupation,
        zipcode: newZipcode || currentUser.zipcode,
        gender: gender === "Male" ? "Male" : "Female",
        imgurl: newImgURL || currentUser.imgurl,
        hobbies: newHobbies || currentUser.hobbies,
        credentials: newCredentials || currentUser.credentials,
        public_id: public_id
      })
      .then(res => {
        this.setState({
          message: "User Profile updated!"
        });
      })
      .catch(e => {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser.username !== this.props.currentUser.username) {
      this.setUser(nextProps.currentUser);
    }
  }

  componentDidMount() {
    this.setState({
      currentUser: this.props.currentUser
    })
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
    const { currentUser } = this.props;
    let Interests = "";

    if (doneEditing) {
      window.location.reload();
      return <Redirect to={`/users/${currentUser.username}`} />;
    }
    return (
      <div id="user-profile" className="margin">
        <form onSubmit={editProfileSubmitForm} id="input-container">
          <div className="sq2-edit">
              <div className="image-crop margin" id="user_image">
                {currentUser.public_id ? (
                  <button id="upload_widget_opener" onClick={makeWidget}>
                    <Image
                      cloudName="tutelage"
                      publicId={currentUser.public_id}
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
                  <div className="user-info-text">
                    <input
                      type="text"
                      name="newFirstName"
                      defaultValue={currentUser.firstname}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="input-box-edit"
                    />
                  </div>
                  <div className="margin-top">
                    <input
                      type="text"
                      name="newLastName"
                      defaultValue={currentUser.lastname}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="input-box-edit"
                    />
                  </div>
                  <div id="quick-user-info" >
                  <div className = "quick-user-options">
                    {" "}
                    Gender:
                {/* {user.gender} */}
                    <br />
                    <input
                      type="radio"
                      name="gender"
                      defaultValue="Male"
                      onChange={handleRadioChange}
                    />{" "}
                    Male{" "}
                    <input
                      type="radio"
                      name="gender"
                      defaultValue="Female"
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
                      defaultValue={currentUser.zipcode}
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
                </div>
              </div>
            </div>
          <div className="user-info-content">
              
                <div className="margin-top">Interests: {Interests}</div>

                <div className="margin-top">
                  <textarea
                    placeholder="Hobbies"
                    cols="70"
                    name="newHobbies"
                    defaultValue={currentUser.hobbies}
                    onChange={handleInputChange}
                    className="input-box-edit"
                  />
                </div>
            <div className="margin-top">
              <textarea
                    placeholder="Credentials"
                    cols="70"
                    name="newCredentials"
                    defaultValue={currentUser.credentials}
                    onChange={handleInputChange}
                    className="input-box-edit"
                    />
                </div>
                <div className="margin-top">
                  <textarea
                    placeholder="Bio"
                    cols="70"
                    name="newBio"
                    defaultValue={currentUser.bio}
                    onChange={handleInputChange}
                    className="input-box-edit"
                  />
                </div>
                <input type="submit" onClick={fireRedirect} className="button-size submit center-submit" />
              </div>
        </form>
          </div>
          );
        }
      }
export default EditProfile;