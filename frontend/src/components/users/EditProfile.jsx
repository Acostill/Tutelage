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
        public_id: this.props.user.username,
        upload_preset: "wpcjhnmk",
        tags: ["users", "tutelage"]
      },
      function(error, result) {
        console.log("REZULTTT:", result[0].secure_url);
        console.log("REZULTTT:", result);
      }
    );
  };

  getPhotos = () => {
    axios.get("http://res.cloudinary.com/tutelage").then(res => {
      console.log(res);
      // this.setState({gallery: res.data.resources});
    });
  };

  getUser = () => {
    console.log('EditProfile', this.props)
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
    console.log('Hello setUser!')
    // console.log(this.props.currentUser);
    // const { currentUser } = this.nexProps.currentUser;
    const { username, firstname, lastname, email,
            ismentor, age, bio, occupation, zipcode,
            gender, imgurl, hobbies, credentials } = currentUser;
    this.setState({
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
    console.log("changing values:", e.target.value);
    // console.log("original values:", this.props.user.firstname);
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

  handleSelect = e => {
    console.log("valszz", this.props.values);
    console.log("TARGET VALUE:", e.target.value);
    this.setState({
      newOccupation: e.target.value
    });
  };

  editProfileSubmitForm = e => {
    e.preventDefault();
    e.stopPropagation();
    // const { user } = this.props;

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
    const { doneEditing } = this.state;
    setTimeout(() => {
      this.setState({
        doneEditing: !this.state.doneEditing
      });
    }, 10);
  };

  componentWillReceiveProps(nextProps) {
    // const { getUnreadMessages } = this.props;
    console.log('Next props:', nextProps.currentUser)
    console.log('Current User:', this.props.currentUser)

    // if (nextProps.signedIn && !this.props.signedIn) {
    //   this.setUser();
    // }
  
    if (nextProps.currentUser.username !== this.props.currentUser.username) {
      console.log('correct condition')
      this.setUser(nextProps.currentUser);
    }
  }

  componentDidMount() {
    this.getUser();
    // this.setUser();
    this.getPhotos();
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
      doneEditing
    } = this.state;
    // console.log("the state here in edit PROFILE IS:", this.state);
    const { currentUser } = this.props;
    let Interests = "";

    if (doneEditing) {
      window.location.reload();
      return <Redirect to={`/users/${currentUser.username}`} />;
    }
    return (
      <div id="user-profile" className="margin">
        <form onSubmit={editProfileSubmitForm} id="input-container">
          <div className="background-banner">
            <div id="user-banner">
              <div className="image-crop margin">
                <button id="upload_widget_opener" onClick={makeWidget}>
                  <Image
                    cloudName="tutelage"
                    publicId={currentUser.username}
                    width="300"
                    // crop="scale"
                  >
                    {/* <Transformation
                      width="900"
                      height="900"
                      background="auto:predominant_gradient:6:palette_orange_white_orange_red_orange_black"
                      crop="pad"
                    /> */}
                  </Image>
                </button>
                {/* <img
                  src={`../${user.imgurl}`}
                  alt="profile picture"
                  className="img"
                /> */}
              </div>
              <div id="user-basic-info">
                <h1 className="user-header">
                  {`${currentUser.firstname} ${currentUser.lastname}`}
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
                <h3> Gender: {currentUser.gender} </h3>
                <h3> Zipcode: {currentUser.zipcode} </h3>
                <h3> Occupation: {currentUser.occupation} </h3>
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
              <div> Zipcode: {currentUser.zipcode} </div>
              <input
                type="text"
                placeholder="Zipcode"
                name="newZipcode"
                value={newZipcode}
                onChange={handleInputChange}
              />
              <div>
                {" "}
                Gender: {currentUser.gender}
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
              <div> Occupation: {currentUser.occupation} </div>
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
            Hobbies: {currentUser.hobbies}
            <input
              type="text"
              placeholder="hobbies"
              name="newHobbies"
              value={hobbies}
              onChange={handleInputChange}
            />
            Credentials: {currentUser.credentials}
            <input
              type="text"
              placeholder="credentials"
              name="newCredentials"
              value={credentials}
              onChange={handleInputChange}
            />
            <div className="margin-top"> Bio: {currentUser.bio} </div>
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
