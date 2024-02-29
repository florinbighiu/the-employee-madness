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
      <h1>Matched Employees</h1>
      <ul>
        {searchResults.map(employee => (
          <li key={employee._id}>
            {employee.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeSearch;
