import React from "react";
import "../../css/InlineRadio.css";

const InlineRadioGroup = props => {
  const { name, values, handleSelect } = props;
  const displayValues = [...values];
  return (
    <div className="choices-container">
      {displayValues.map(optionScale => (
        <span className="radio-choice">
          <input
            type="radio"
            name={name}
            value={optionScale}
            onChange={handleSelect}
            className="radio-button"
          />
          <p className="answer-content"> {optionScale} </p>
        </span>
      ))}
    </div>
  );
};
export default InlineRadioGroup;
