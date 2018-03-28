import React from 'react';

const InlineRadioGroup = props => {
  const { name, values, handleSelect } = props;
  const displayValues = [...values];
  return (
    <div>
      {displayValues.map(optionScale => (
        <span>
          <h5>{optionScale}</h5>
          <input
            type="radio"
            name={name}
            value={optionScale}
            onChange={handleSelect}
          />
        </span>
      ))}
    </div>
  );
};
export default InlineRadioGroup;
