import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { search } = useParams();

  useEffect(() => {
    fetch(`/employees/${search}`)
      .then(response => response.json())
      .then(data => setSearchResults(data))
      .catch(error => console.error('Failed to search employees:', error));
  }, [search]);

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Matched Employees</h1>
          <span className="subtitle">
            {searchResults.length} result{searchResults.length === 1 ? "" : "s"} for “{search}”
          </span>
        </div>
      </div>

      <div className="card table-wrap">
        {searchResults.length === 0 ? (
          <div className="empty-state">
            <h3>No matches</h3>
            <p>No employees matched your search.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((employee) => (
                <tr key={employee._id}>
                  <td>
                    <strong>{employee.name}</strong>
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

export default EmployeeSearch;
