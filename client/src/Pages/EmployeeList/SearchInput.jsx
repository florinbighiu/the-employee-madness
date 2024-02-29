import React from "react";

const SearchInput = ({ value, onChange }) => (
  <div>
    <label htmlFor="searchQuery">Search:</label>
    <input
      id="searchQuery"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default SearchInput;
