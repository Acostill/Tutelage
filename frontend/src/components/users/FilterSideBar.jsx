import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "../../css/FilterSideBar.css";

class FilterSideBar extends Component {
  constructor(props){
    super(props)
  }



  render() {
    const {currentUser, handleSubmit}=this.props
    console.log("maaan",currentUser.ismentor)
    return (
      <div>
        <ul id="qualities_list">
          <legend>
            <h2> Filter By: </h2>
          </legend>
          <legend>
            <h2> Tutelage Custom Filter: </h2>
            {this.props.currentUser.ismentor
          ?  (<button id="custom-search-btn" className="search-btn" onClick={this.props.handleSubmit}> Find Your Tutelage Mentee </button>) 
          :  (<button id="custom-search-btn" className="search-btn" onClick={this.props.handleSubmit}> Find Your Tutelage Mentor </button>)}
          </legend>


          <li id="statement1">
            <p> Gender: </p>

            <div className="choices">
              <div>
                <input type="radio" id="state1choice1" name="gender"/>
                No preference
              </div>
              <div>
                <input type="radio" id="state1choice2" name="gender"/>
                Male
              </div>
              <div>
                <input type="radio" id="state1choice3" name="gender"/>
                Female
              </div>
            </div>
          </li>

          <li id="statement2">
            <p> Age group: </p>

            <div className="choices">
              <div>
                <input type="radio" id="state2choice1" name="age"/>
                18 - 25
              </div>
              <div>
                <input type="radio" id="state2choice2" name="age"/>
                26 - 30
              </div>
              <div>
                <input type="radio" id="state2choice3" name="age"/>
                31 - 35
              </div>
              <div>
                <input type="radio" id="state2choice4" name="age"/>
                36 - 40
              </div>
              <div>
                <input type="radio" id="state2choice5" name="age"/>
                41 - 45
              </div>
              <div>
                <input type="radio" id="state2choice6" name="age"/>
                46 - 50
              </div>
              <div>
                <input type="radio" id="state2choice7" name="age"/>
                50+
              </div>
            </div>
          </li>

          <li id="statement3">
            <p> Expertise: </p>

            <div className="choices">
              <div>
                <input type="radio" id="state3choice1" name="business"/>
                Corporate Business
              </div>
              <div>
                <input type="radio" id="state3choice2" name="business"/>
                Design
              </div>
              <div>
                <input type="radio" id="state3choice3" name="business"/>
                Engineers
              </div>
              <div>
                <input type="radio" id="state3choice4" name="business"/>
                Development
              </div>
              <div>
                <input type="radio" id="state3choice5" name="business"/>
                Entrepreneur
              </div>
              <div>
                <input type="radio" id="state3choice6" name="business"/>
                Social Service
              </div>
            </div>
          </li>

          <li id="statement4">
            <p> Years in the field: </p>

            <div className="choices">
              <div>
                <input type="radio" id="state4choice1" name="experience"/>
                1 - 2 years
              </div>
              <div>
                <input type="radio" id="state4choice2" name="experience"/>
                3 - 6 years
              </div>
              <div>
                <input type="radio" id="state4choice3" name="experience"/>
                7 - 9 years
              </div>
              <div>
                <input type="radio" id="state4choice4" name="experience"/>
                10 - 14 years
              </div>
              <div>
                <input type="radio" id="state4choice5" name="experience"/>
                15 - 20 years
              </div>
              <div>
                <input type="radio" id="state4choice6" name="experience"/>
                20+ years
              </div>
            </div>
          </li>

          <li id="statement5">
            <p> Availability: </p>

            <div className="choices">
              <div>
                <input type="radio" id="state5choice1" name="availability"/>
                Once a month
              </div>
              <div>
                <input type="radio" id="state5choice2" name="availability"/>
                Once every two weeks
              </div>
              <div>
                <input type="radio" id="state5choice3" name="availability"/>
                Once a week
              </div>
              <div>
                <input type="radio" id="state5choice4" name="availability"/>
                Twice a week
              </div>
              <div>
                <input type="radio" id="state5choice5" name="availability"/>
                Weekdays
              </div>
              <div>
                <input type="radio" id="state5choice6" name="availability"/>
                Weekends
              </div>
            </div>
          </li>

          <li id="statement6">
            <p>Beliefs/Religion:</p>

            <div className="choices">
              <div>
                <input type="radio" id="state6choice1" name="religion"/>
                None
              </div>
              <div>
                <input type="radio" id="state6choice2" name="religion"/>
                Christianity
              </div>
              <div>
                <input type="radio" id="state6choice3" name="religion"/>
                Buddhism
              </div>
              <div>
                <input type="radio" id="state6choice4" name="religion"/>
                Judaism
              </div>
              <div>
                <input type="radio" id="state6choice5" name="religion"/>
                Islam
              </div>
              <div>
                <input type="radio" id="state6choice6" name="religion"/>
                Hinduism
              </div>
            </div>
          </li>

          <li id="statement7">
            <p>Language Spoken: </p>

            <div className="choices">
              <div>
                <input type="radio" id="state7choice1" name="languages"/>
                English
              </div>
              <div>
                <input type="radio" id="state7choice2" name="languages"/>
                Spanish
              </div>
              <div>
                <input type="radio" id="state7choice3" name="languages"/>
                Chinese
              </div>
              <div>
                <input type="radio" id="state7choice4" name="languages"/>
                Tagalog
              </div>
              <div>
                <input type="radio" id="state7choice5" name="languages"/>
                Arabic
              </div>
              <div>
                <input type="radio" id="state7choice6" name="languages"/>
                Korean
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default FilterSideBar;
