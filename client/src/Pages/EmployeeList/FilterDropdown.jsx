import React from "react";

const FilterDropdown = ({ id, label, options, value, onChange }) => (
  <div className="center">
    <label htmlFor={id}>{label} </label>
    <select id={id} value={value} onChange={onChange} style={{width: "100px", textAlign: "center"}}>
      <option value="">All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default FilterDropdown;
