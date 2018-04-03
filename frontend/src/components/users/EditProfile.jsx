import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../../css/EditProfile.css";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
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
      doneEditting: false
    };
  }

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
    console.log("changing values:", e.target.value);
    console.log("original values:", this.props.user.firstname);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRadioChange = e => {
    console.log("changing genders:", e.target.value);

    this.setState({
      [e.target.name]: e.target.value
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
      newCredentials
    } = this.state;
    console.log("STATE IN EDITPROOOOFILEE", this.state);

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
        credentials: newCredentials
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
    const { doneEditting } = this.state;
    setTimeout(() => {
      this.setState({
        doneEditting: !this.state.doneEditting
      });
    }, 100);
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
      editProfileSubmitForm,
      fireRedirect
    } = this;
    const {
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
      doneEditting
    } = this.state;
    console.log("the state here in edit:", this.state);
    const { user } = this.props;
    console.log("props in the render:", this.props);
    let Interests = "";

    if (doneEditting) {
      return <Redirect to={`/users/${user.username}`} />;
    }
    return (
      <div id="user-profile" className="margin">
        <form onSubmit={editProfileSubmitForm} id="input-container">
          <div className="background-banner">
            <div className="sq2-edit" />
            <div id="user-banner">
              <div className="image-crop margin">
                <img
                  src={`../${user.imgurl}`}
                  alt="profile picture"
                  className="img"
                />
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
            <div id="quick-user-info" className="margin-top">
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
                {/* {user.zipcode}  */}
                <input
                  type="text"
                  placeholder="Zipcode"
                  name="newZipcode"
                  value={newZipcode}
                  onChange={handleInputChange}
                  className="input-box-edit"
                />
              </div>
              <div className="margin-top">
                {/* {user.occupation}  */}
                <input
                  type="text"
                  placeholder="Occupation"
                  name="newOccupation"
                  value={occupation}
                  onChange={handleInputChange}
                  className="input-box-edit"
                />
              </div>
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
            <input type="submit" onClick={fireRedirect} className="button-size submit"/>
          </div>
        </form>
      </div>
    );
  }
}

export default EditProfile;
