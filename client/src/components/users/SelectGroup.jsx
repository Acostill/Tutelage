import React from "react";
import "../../css/SelectGroup.css"

const SelectGroup = ({ categories, selectedOptions, handleSelect }) => {
  return (
    <div>
      <div className="divider" ><hr/></div>
      <h2 className="filter-title"> Filter By: </h2>
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
                  if(option === "") {
                    return <option value=""> Any </option>
                  }
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
