import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "../../css/FilterSideBar.css";

class FilterSideBar extends Component {
  render() {
    return (
      <div>
        <ul id="qualities_list">
          {/* <li> */}
          <legend>
            <h2> Filter By Similarities: </h2>
          </legend>
          {/* </li> */}

          <li id="statement1">
            <p> Gender: </p>

            <div className="choices">
              <div>
                <input type="radio" id="state1choice1" />
                No preference
              </div>
              <div>
                <input type="radio" id="state1choice2" />
                Male
              </div>
              <div>
                <input type="radio" id="state1choice3" />
                Female
              </div>
            </div>
          </li>

          <li id="statement2">
            <p> Age group: </p>

            <div className="choices">
              <div>
                <input type="radio" id="state2choice1" />
                18 - 25
              </div>
              <div>
                <input type="radio" id="state2choice2" />
                26 - 30
              </div>
              <div>
                <input type="radio" id="state2choice3" />
                31 - 35
              </div>
              <div>
                <input type="radio" id="state2choice4" />
                36 - 40
              </div>
              <div>
                <input type="radio" id="state2choice5" />
                41 - 45
              </div>
              <div>
                <input type="radio" id="state2choice6" />
                46 - 50
              </div>
            </div>
          </li>

          <li id="statement3">
            <p> Expertise: </p>

            <div className="choices">
              <div>
                <input type="radio" id="state3choice1" />
                Corporate Business
              </div>
              <div>
                <input type="radio" id="state3choice2" />
                Design
              </div>
              <div>
                <input type="radio" id="state3choice3" />
                Engineers
              </div>
              <div>
                <input type="radio" id="state3choice4" />
                Development
              </div>
              <div>
                <input type="radio" id="state3choice5" />
                Entrepreneur
              </div>
              <div>
                <input type="radio" id="state3choice6" />
                Social Service
              </div>
            </div>
          </li>

          <li id="statement4">
            <p> Years in the field: </p>

            <div className="choices">
              <div>
                <input type="radio" id="state4choice1" />
                1 - 2 years
              </div>
              <div>
                <input type="radio" id="state4choice2" />
                3 - 6 years
              </div>
              <div>
                <input type="radio" id="state4choice3" />
                7 - 9 years
              </div>
              <div>
                <input type="radio" id="state4choice4" />
                10 - 14 years
              </div>
              <div>
                <input type="radio" id="state4choice5" />
                15 - 20 years
              </div>
              <div>
                <input type="radio" id="state4choice6" />
                20+ years
              </div>
            </div>
          </li>

          <li id="statement5">
            <p> Availbility: </p>

            <div className="choices">
              <div>
                <input type="radio" id="state5choice1" />
                Once a month
              </div>
              <div>
                <input type="radio" id="state5choice2" />
                Once every two weeks
              </div>
              <div>
                <input type="radio" id="state5choice3" />
                Once a week
              </div>
              <div>
                <input type="radio" id="state5choice4" />
                Twice a week
              </div>
              <div>
                <input type="radio" id="state5choice5" />
                Weekdays
              </div>
              <div>
                <input type="radio" id="state5choice6" />
                Weekends
              </div>
            </div>
          </li>

          <li id="statement6">
            <p>Beliefs/Religion:</p>

            <div className="choices">
              <div>
                <input type="radio" id="state6choice1" />
                None
              </div>
              <div>
                <input type="radio" id="state6choice2" />
                Christianity
              </div>
              <div>
                <input type="radio" id="state6choice3" />
                Buddhism
              </div>
              <div>
                <input type="radio" id="state6choice4" />
                Judaism
              </div>
              <div>
                <input type="radio" id="state6choice5" />
                Islam
              </div>
              <div>
                <input type="radio" id="state6choice6" />
                Hinduism
              </div>
            </div>
          </li>

          <li id="statement7">
            <p>Language Spoken: </p>

            <div className="choices">
              <div>
                <input type="radio" id="state7choice1" />
                English
              </div>
              <div>
                <input type="radio" id="state7choice2" />
                Spanish
              </div>
              <div>
                <input type="radio" id="state7choice3" />
                Chinese
              </div>
              <div>
                <input type="radio" id="state7choice4" />
                Tagalog
              </div>
              <div>
                <input type="radio" id="state7choice5" />
                Arabic
              </div>
              <div>
                <input type="radio" id="state7choice6" />
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
