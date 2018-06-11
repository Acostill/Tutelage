import React from 'react';

class Select extends React.Component {
    render() {
      const { values, selectedValue, handleSelect, name } = this.props
      const arrayOfValuesToShowInTheSelectList = ['', ...values]
  
      return (
        <select
          value={selectedValue}
          name={name}
          onChange={handleSelect}
        >
          {arrayOfValuesToShowInTheSelectList.map(val =>
            <option value={val}>{val}</option>)}
        </select>
      )
    }
  }
export default Select;  