import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "../../css/FilterSideBar.css";
import "../../css/hamburger.css";
import { slide as Menu } from "react-burger-menu";
import SelectGroup from "./SelectGroup";

class FilterSideBar extends Component {
  constructor(props) {
    super(props);

    this.categories = [
      {
        id: "1",
        title: "Gender",
        name: "gender",
        options: ["Male", "Female"]
      },
      {
        id: "2",
        title: "Age-group",
        name: "age_group",
        options: ["18 - 28", "29 - 39", "40 - 49", "50 +"]
      },
      {
        id: "3",
        title: "Area of Expertise",
        name: "occupation",
        options: [
          "Business",
          "Design",
          "Engineer",
          "Development",
          "Entrepreneur",
          "Social Services"
        ]
      },
      {
        id: "4",
        title: "Language Spoken",
        name: "language",
        options: [
          "English",
          "Spanish",
          "Chinese",
          "Tagalog",
          "Vietnamese",
          "Arabic",
          "French",
          "Korean",
          "Russian",
          "Other"
        ]
      }
    ];

    this.state = {
      category_id: "",
      selectedOptions: {
        gender: "",
        age_group: "",
        occupation: "",
        language: ""
      }
    };
  }

  handleSelect = e => {
    const { selectedOptions } = this.state;
    this.setState(
      {
        selectedOptions: {
          ...selectedOptions,
          [e.target.name]: e.target.value
        }
      },
      () => {
        this.props.handleSelect(this.state.selectedOptions.gender);
      }
    );
  };

  render() {
    const { currentUser, handleSubmit, handleGenderSelect } = this.props;
    const { categories, handleSelect } = this;
    const { selectedOptions } = this.state;

    return (
      <div>
        <div className="filter-sidebar" id="main-filter-sidebar">
          <div className="custom-filter">
            <h2 className="custom-filter-title"> Custom Filter: </h2>
            {this.props.currentUser.ismentor ? (
              <button
                id="custom-search-btn"
                className="search-btn"
                onClick={this.props.handleSubmit}
              >
                Mentee Match
              </button>
            ) : (
              <button
                id="custom-search-btn"
                className="search-btn"
                onClick={this.props.handleSubmit}
              >
                Mentor Match
              </button>
            )}
            <SelectGroup
              categories={categories}
              selectedOptions={selectedOptions}
              handleSelect={handleSelect}
            />
          </div>
        </div>
        <Menu left width={ 280 }>
          <div><div className="filter-sidebar2" id="main-filter-sidebar2">
          <div className="custom-filter">
            <h2 className="custom-filter-title"> Custom Filter: </h2>
            {this.props.currentUser.ismentor ? (
              <button
                id="custom-search-btn"
                className="search-btn"
                onClick={this.props.handleSubmit}
              >
                Mentee Match
              </button>
            ) : (
              <button
                id="custom-search-btn"
                className="search-btn"
                onClick={this.props.handleSubmit}
              >
                Mentor Match
              </button>
            )}
            <SelectGroup
              categories={categories}
              selectedOptions={selectedOptions}
              handleSelect={handleSelect}
            />
          </div>
        </div></div>
        </Menu>
      </div>
    );
  }
}
export default FilterSideBar;
