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

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th>Brand</th>
            <th>Height</th>
            <th>Attendance</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {updatedEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>{employee.brand}</td>
              <td>{employee.height}</td>
              <td>
                <button
                  type="button"
                  style={{ marginRight: "5rem" }}
                  onClick={() => setMissing(employee)}
                  disabled={employee.missing}
                  className={employee.missing ? "disabled-button" : "active-button"}>
                  Missing
                </button>

                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
                <button type="button" onClick={() => randomize(employee)}>
                  Randomize
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
