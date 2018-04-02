import React from "react";
import "../../css/SelectGroup.css"

const SelectGroup = ({ categories, selectedOptions, handleSelect }) => {
  return (
    <div>
      <hr/>
      <h2 style={{"text-align": "center"}}> Or </h2>
      <hr/>
      <h2> Filter By: </h2>
      {categories.map(category => {
        return (
          <form className="styled-select">
            <div className="select-container">
              <label htmlFor={category.title} className="category-label">
                {category.title}
              </label>
              <select
                value={selectedOptions[category.name]}
                name={category.name}
                className="category-select"
                onChange={handleSelect}
              >
                {["", ...category.options].map(option => {
                  return <option value={option}>{option}</option>;
                })})
              </select>
            </div>
          </form>
        );
      })}
    </div>
  );
};

export default SelectGroup;
