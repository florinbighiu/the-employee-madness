import React, { useState, useEffect } from "react";
import axios from "axios";

const Missing = () => {
  const [missingEmployees, setMissingEmployees] = useState([]);

  const fetchMissingEmployees = async () => {
    try {
      const response = await axios.get("/api/employees");
      if (response.status === 200) {
        const allEmployees = response.data;
        const missingEmployees = allEmployees.filter((employee) => employee.missing === true);
        setMissingEmployees(missingEmployees);
      } else {
        console.error("Failed to fetch missing employees");
      }
    } catch (error) {
      console.error("Failed to fetch missing employees", error);
    }
  };

  useEffect(() => {
    fetchMissingEmployees();
  }, []);

  const removeFromMissing = async (employee) => {
    try {
      const response = await axios.patch(`/api/employees/${employee._id}`, { missing: false });
      if (response.status === 200) {
        fetchMissingEmployees();
      }
    } catch (error) {
      console.error("Failed to fetch employee data", error);
    }
  };

  return (
    <div className="missing">
      <h2>Missing Employees</h2>
      {missingEmployees.length === 0 ? (
        <p>No missing employees found.</p>
      ) : (
        <table className="missingTable">
          <tbody>
            {missingEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>
                  <button type="button" onClick={() => removeFromMissing(employee)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Missing;
