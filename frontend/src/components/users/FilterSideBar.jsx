import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "../../css/FilterSideBar.css";

class FilterSideBar extends Component {
  render() {
    return (
      <div>
        <ul id="qualities_list">
          <li>
            <h3> Filter By Similarities: </h3>
            <p> ------------------------ </p>
          </li>

          <li id="statement1">
            <p> Gender: </p>
            <input type="radio" id="state1choice1" />
            No preference
            <input type="radio" id="state1choice2" />
            Male
            <input type="radio" id="state1choice3" />
            Female
          </li>

          <li id="statement2">
            <p> Age group: </p>
            <input type="radio" id="state2choice1" />
            18 - 25
            <input type="radio" id="state2choice2" />
            26 - 30
            <input type="radio" id="state2choice3" />
            31 - 35
            <input type="radio" id="state2choice4" />
            36 - 40
            <input type="radio" id="state2choice5" />
            41 - 45
            <input type="radio" id="state2choice6" />
            46 - 50
          </li>

          <li id="statement3">
            <p> Expertise: </p>
            <input type="radio" id="state3choice1" />
            Corporate Business
            <input type="radio" id="state3choice2" />
            Design
            <input type="radio" id="state3choice3" />
            Engineers
            <input type="radio" id="state3choice4" />
            Development
            <input type="radio" id="state3choice5" />
            Entrepreneur
            <input type="radio" id="state3choice6" />
            Social Service
          </li>

          <li id="statement4">
            <p> Years in the field: </p>
            <input type="radio" id="state4choice1" />
            1 - 2 years
            <input type="radio" id="state4choice2" />
            3 - 6 years
            <input type="radio" id="state4choice3" />
            7 - 9 years
            <input type="radio" id="state4choice4" />
            10 - 14 years
            <input type="radio" id="state4choice5" />
            15 - 20 years
            <input type="radio" id="state4choice6" />
            20+ years
          </li>

          <li id="statement5">
            <p> Availbility: </p>
            <input type="radio" id="state5choice1" />
            Once a month
            <input type="radio" id="state5choice2" />
            Once every two weeks
            <input type="radio" id="state5choice3" />
            Once a week
            <input type="radio" id="state5choice4" />
            Twice a week
            <input type="radio" id="state5choice5" />
            Weekdays
            <input type="radio" id="state5choice6" />
            Weekends
          </li>

          <li id="statement6">
            <p>Beliefs/Religion:</p>
            <input type="radio" id="state6choice1" />
            None
            <input type="radio" id="state6choice2" />
            Christianity
            <input type="radio" id="state6choice3" />
            Buddhism
            <input type="radio" id="state6choice4" />
            Judaism
            <input type="radio" id="state6choice5" />
            Islam
            <input type="radio" id="state6choice6" />
            Hinduism
          </li>

          <li id="statement7">
            <p>Language Spoken: </p>
            <input type="radio" id="state7choice1" />
            English
            <input type="radio" id="state7choice2" />
            Spanish
            <input type="radio" id="state7choice3" />
            Chinese
            <input type="radio" id="state7choice4" />
            Tagalog
            <input type="radio" id="state7choice5" />
            Arabic
            <input type="radio" id="state7choice6" />
            Korean
          </li>
        </ul>
      </div>
    );
  }
}

export default FilterSideBar;
