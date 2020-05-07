import React from 'react'

const SelectBar = ({onSelect}) => {
  return (
    <div style={{width:"90%"}}>
    <select onChange={onSelect}  defaultValue="0" className="browser-default custom-select">
      <option disabled value="0">Choose your option</option>
      <option value="all">All</option>
      <option value="consumer staples">Consumer Staples</option>
      <option value="consumer discretionary">Consumer Discretionary</option>
      <option value="energy">Energy</option>
      <option value="financials">Financials</option>
      <option value="health care">Health Care</option>
      <option value="industrials">Industrials</option>
      <option value="information technology">Information Technology</option>
      <option value="materials">Materials</option>
      <option value="real estate">Real Estate</option>
      <option value="telecommunication services">Telecommunication Services</option>
      <option value="utilities">Utilities</option>
      
    </select>
  </div>
  );
}

export default SelectBar;