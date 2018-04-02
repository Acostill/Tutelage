import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "../../css/FilterSideBar.css";
import SelectGroup from "./SelectGroup";

class FilterSideBar extends Component {
  constructor(props) {
    super(props);

    this.categories = [
      {
        id: "1",
        title: "Gender",
        name: "gender",
        options: ["no preference", "male", "female"]
      },
      {
        id: "2",
        title: "Age-group",
        name: "age_group",
        options: [
          "18 - 25",
          "26 - 30",
          "31 - 35",
          "36 - 40",
          "41 - 45",
          "46 - 50",
          "50+"
        ]
      },
      {
        id: "3",
        title: "Expertise",
        name: "expertise",
        options: [
          "Corporate Business",
          "Design",
          "Engineers",
          "Development",
          "Entrepreneur",
          "Social Service"
        ]
      },
      {
        id: "4",
        title: "Years In Field",
        name: "years_in_field",
        options: [
          "1 - 2 years",
          "3 - 6 years",
          "7 - 9 years",
          "10 - 14 years",
          "15 - 20 years",
          "20+ years"
        ]
      },
      {
        id: "5",
        title: "Blank",
        name: "years_in_field",
        options: [
          "1 - 2 years",
          "3 - 6 years",
          "7 - 9 years",
          "10 - 14 years",
          "15 - 20 years",
          "20+ years"
        ]
      },
      {
        id: "6",
        title: "Blank",
        name: "years_in_field",
        options: [
          "1 - 2 years",
          "3 - 6 years",
          "7 - 9 years",
          "10 - 14 years",
          "15 - 20 years",
          "20+ years"
        ]
      },
      {
        id: "7",
        title: "Blank",
        name: "years_in_field",
        options: [
          "1 - 2 years",
          "3 - 6 years",
          "7 - 9 years",
          "10 - 14 years",
          "15 - 20 years",
          "20+ years"
        ]
      },
    ];

    this.state = {
      category_id: "",
      selectedOptions: {
        gender: "",
        age_group: "",
        expertise: "",
        years_in_field: ""
      },
    };
  }

  handleSelect = e => {
    const { selectedOptions } = this.state;
    this.setState({
      selectedOptions: {
        ...selectedOptions,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    const { currentUser, handleSubmit } = this.props;
    const { categories, handleSelect} = this;
    const { selectedOptions } = this.state;
    console.log("this =>>", this);
    console.log("this.state =>", this.state);

    return (
      <div className="filter-sidebar">
        <div className="custom-filter">
          <h2> Tutelage Custom Filter: </h2>
          {this.props.currentUser.ismentor ? (
            <button
              id="custom-search-btn"
              className="search-btn"
              onClick={this.props.handleSubmit}
            >
              <p className="find-statement">Find Your Tutelage Mentee </p>
            </button>
          ) : (
            <button
              id="custom-search-btn"
              className="search-btn"
              onClick={this.props.handleSubmit}
            >
              <p className="find-statement">Find Your Tutelage Mentor</p>
            </button>
          )}
        </div>

          <SelectGroup
          categories={categories}
          selectedOptions={selectedOptions}
          handleSelect={handleSelect}
        />
      </div>
    );
  }
}
export default FilterSideBar;
