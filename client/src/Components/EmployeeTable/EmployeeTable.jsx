import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeTable = ({ employees, onDelete, search }) => {
  const [updatedEmployees, setUpdatedEmployees] = useState([]);

  useEffect(() => {
    setUpdatedEmployees(employees);
  }, [employees]);

  const setMissing = async (employee) => {
    try {
      await axios.patch(`/api/employees/${employee._id}`, { missing: true });
      const updatedEmployeesCopy = updatedEmployees.map((emp) =>
        emp._id === employee._id ? { ...emp, missing: true } : emp
      );
      setUpdatedEmployees(updatedEmployeesCopy);
    } catch (error) {
      console.error("Failed to fetch employee data", error);
    }
  };

  const randomize = async (employee) => {
    try {
      const newHeight = Math.floor(Math.random() * 50) + 140;
      const response = await axios.patch(`/api/employees/${employee._id}`, { height: newHeight });
      if (response) {
        const updatedEmployee = response.data;
        const updatedEmployeesCopy = updatedEmployees.map((emp) =>
          emp._id === updatedEmployee._id ? updatedEmployee : emp
        );
        setUpdatedEmployees(updatedEmployeesCopy);
      } else {
        console.error("Failed to update employee height");
      }
    } catch (error) {
      console.error("Failed to fetch employee data", error);
    }
  };

  if (updatedEmployees.length === 0) {
    return (
      <div className="empty-state">
        <h3>No employees found</h3>
        <p>Try adjusting your filters or add a new employee.</p>
      </div>
    );
  }

  return (
    <table className="EmployeeTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Brand</th>
          <th>Height</th>
          <th style={{ textAlign: "right" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {updatedEmployees.map((employee) => (
          <tr key={employee._id}>
            <td>
              <strong>{employee.name}</strong>
              {employee.missing && (
                <span className="badge badge-warning" style={{ marginLeft: "0.5rem" }}>
                  Missing
                </span>
              )}
            </td>
            <td>
              <span className="badge">{employee.level}</span>
            </td>
            <td>{employee.position}</td>
            <td>{employee.brand}</td>
            <td>{employee.height ? `${employee.height} cm` : "—"}</td>
            <td>
              <div className="row-actions">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setMissing(employee)}
                  disabled={employee.missing}>
                  Missing
                </button>
                <Link to={`/update/${employee._id}`}>
                  <button type="button" className="btn btn-soft btn-sm">
                    Update
                  </button>
                </Link>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => randomize(employee)}>
                  Randomize
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
