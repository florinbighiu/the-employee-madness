import React from "react";

const FilterDropdown = ({ id, label, options, value, onChange }) => (
  <div className="filter-field">
    <label htmlFor={id} className="toolbar-label">
      {label}
    </label>
    <select id={id} value={value} onChange={onChange}>
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
