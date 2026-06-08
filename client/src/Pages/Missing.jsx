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
    <div>
      <div className="page-head">
        <div>
          <h1>Missing Employees</h1>
          <span className="subtitle">
            {missingEmployees.length} employee{missingEmployees.length === 1 ? "" : "s"} flagged as missing
          </span>
        </div>
      </div>

      <div className="card table-wrap">
        {missingEmployees.length === 0 ? (
          <div className="empty-state">
            <h3>All accounted for</h3>
            <p>No employees are currently flagged as missing.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {missingEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>
                    <strong>{employee.name}</strong>
                    <span className="badge badge-warning" style={{ marginLeft: "0.5rem" }}>
                      Missing
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        type="button"
                        className="btn btn-soft btn-sm"
                        onClick={() => removeFromMissing(employee)}>
                        Mark as Found
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Missing;
