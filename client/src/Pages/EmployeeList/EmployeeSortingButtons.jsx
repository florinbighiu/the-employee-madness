import React from "react";

const options = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "middleName", label: "Middle Name" },
  { key: "position", label: "Position" },
  { key: "level", label: "Level" },
];

const EmployeeSortingButtons = ({ onSort, active, order }) => (
  <div className="sorting">
    {options.map(({ key, label }) => {
      const isActive = active === key;
      return (
        <button
          key={key}
          type="button"
          className={isActive ? "btn btn-sm" : "btn btn-ghost btn-sm"}
          onClick={() => onSort(key)}
        >
          {label}
          {isActive ? (order === "asc" ? " ↑" : " ↓") : ""}
        </button>
      );
    })}
  </div>
);

export default EmployeeSortingButtons;
