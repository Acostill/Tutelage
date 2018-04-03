import React, { Component } from "react";
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
      Male: "",
      Female: ""
    };
  }

  getUser = () => {
    let username = this.props.user.username
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
    console.log("changing values:", e.target.value)
    console.log("original values:", this.props.user.firstname)
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  
  handleRadioChange = e => {
    console.log("changing genders:", e.target.value)
    
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  editProfileSubmitForm = e => {
    e.preventDefault();
    e.stopPropagation();
    const { user } = this.props

    //finish defining vars from state
    let { newUserName, newFirstName, newLastName, newEmail, newIsmentor, newAge, newBio, newOccupation, newZipcode, newGender, newImgURL, Male, Female } = this.state;
    console.log("STATE IN EDITPROOOOFILEE", this.state)

    axios
      .patch('/users/edit', {
        username: newUserName,
        firstname: newFirstName,
        lastname: newLastName,
        email: newEmail,
        ismentor: newIsmentor,
        age: newAge,
        bio: newBio,
        occupation: newOccupation,
        zipcode: newZipcode,
        gender: Male ? Male : Female,
        imgurl: newImgURL
      })
      .then(res => {
        this.setState({
          message: 'User Profile updated!'
        })
      })
      .catch(e => {
        console.log(e)
        this.setState({
          message: 'Error updating profile'
        })
      })
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { clearMessage, handleTextArea, handleInputChange, handleRadioChange, editProfileSubmitForm } = this;
    const { userMessage, newUserName, newFirstName, newLastName, newEmail, newIsmentor, newAge, newBio, newOccupation, newZipcode, newGender, newImgURL } = this.state;
    console.log("the state here in edit:", this.state)
    const { user } = this.props
    console.log("props in the render:", this.props)

    let Interests = "";

    return (

      <div id="user-profile" className="margin">
        <form onSubmit={editProfileSubmitForm} id="input-container">
          <div className="background-banner">

            <div id="user-banner">
              <div className="image-crop margin">
                <img src={`../${user.imgurl}`} alt="profile picture" className="img" />
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
                <input
                  type="text"
                  name="imgURL"
                  placeholder="Link of Image"
                  value={newImgURL}
                  onChange={handleInputChange}
                />
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
              <div> Gender: {user.gender}
                < br />
                <input
                  type="radio"
                  name="Male"
                  value="Male"
                  onChange={handleRadioChange}
                />
                {" "}Male {" "}
                <input
                  type="radio"
                  name="Female"
                  value="Female"
                  onChange={handleRadioChange}
                />

                {" "}Female </div>
              <div> Occupation: {user.occupation} </div>
              <input
                type="text"
                placeholder="Occupation"
                name="newOccupation"
                value={newOccupation}
                onChange={handleInputChange}
              />
            </div>
            <div className="margin-top">
              Interests: {Interests} </div>
            <div className="margin-top"> Bio: {user.bio} </div>
            <input
              type="text"
              placeholder="Bio"
              name="newBio"
              value={newBio}
              onChange={handleInputChange}
            />
          </div>
          <input type="submit" />

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

