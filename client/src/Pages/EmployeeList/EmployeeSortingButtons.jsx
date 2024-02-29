import React from "react";

const EmployeeSortingButtons = ({ onSort }) => (
  <div className="sorting">
    <button onClick={() => onSort("firstName")}>Sort by First Name</button>
    <button onClick={() => onSort("lastName")}>Sort by Last Name</button>
    <button onClick={() => onSort("middleName")}>Sort by Middle Name</button>
    <button onClick={() => onSort("position")}>Sort by Position</button>
    <button onClick={() => onSort("level")}>Sort by Level</button>
  </div>
);

export default EmployeeSortingButtons;
