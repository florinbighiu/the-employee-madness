import React from "react";

const SearchInput = ({ value, onChange }) => (
  <div className="search-input">
    <svg
      className="search-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
    <input
      id="searchQuery"
      type="text"
      placeholder="Search name, position, level…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default SearchInput;
