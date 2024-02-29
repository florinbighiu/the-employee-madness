import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import EmployeeTable from "../../Components/EmployeeTable";
import EmployeeSortingButtons from "./EmployeeSortingButtons";
import FilterDropdown from "./FilterDropdown";
import SearchInput from "./SearchInput";

const fetchEmployees = async () => {
  const res = await fetch("/api/employees");
  return await res.json();
};

const deleteEmployee = async (id) => {
  const res = await fetch(`http://localhost:8080/api/employees/${id}`, { method: "DELETE" });
  return await res.json();
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [positionFilter, setPositionFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    fetchEmployees().then((employees) => {
      setLoading(false);
      setEmployees(employees);
      setFilteredEmployees(employees);
    });
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [positionFilter, levelFilter, searchQuery]);

  const filterEmployees = () => {
    let filteredResults = employees;

    if (positionFilter) {
      filteredResults = filteredResults.filter((employee) => employee.position === positionFilter);
    }

    if (levelFilter) {
      filteredResults = filteredResults.filter((employee) => employee.level === levelFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredResults = filteredResults.filter(
        (employee) =>
          employee.name.toLowerCase().includes(query) ||
          employee.position.toLowerCase().includes(query) ||
          employee.level.toLowerCase().includes(query)
      );
    }

    setFilteredEmployees(filteredResults);
  };

  const sortEmployees = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  };

  const sortedEmployees = sortCriteria
    ? [...(filteredEmployees || [])].sort((a, b) => {
        const firstNameA = a.name.split(" ")[0];
        const firstNameB = b.name.split(" ")[0];
        const lastNameA = a.name.split(" ").pop();
        const lastNameB = b.name.split(" ").pop();
        const middleNameA = a.name.match(/\b(\w)\./)?.[1] || "";
        const middleNameB = b.name.match(/\b(\w)\./)?.[1] || "";

        if (sortCriteria === "firstName") {
          if (firstNameA !== firstNameB) {
            return sortOrder === "asc"
              ? firstNameA.localeCompare(firstNameB)
              : firstNameB.localeCompare(firstNameA);
          }
        } else if (sortCriteria === "lastName") {
          if (lastNameA !== lastNameB) {
            return sortOrder === "asc"
              ? lastNameA.localeCompare(lastNameB)
              : lastNameB.localeCompare(lastNameA);
          }
        } else if (sortCriteria === "middleName") {
          if (middleNameA !== middleNameB) {
            return sortOrder === "asc"
              ? middleNameA.localeCompare(middleNameB)
              : middleNameB.localeCompare(middleNameA);
          }
        } else if (sortCriteria === "position") {
          if (a.position !== b.position) {
            return sortOrder === "asc"
              ? a.position.localeCompare(b.position)
              : b.position.localeCompare(a.position);
          }
        } else if (sortCriteria === "level") {
          if (a.level !== b.level) {
            return sortOrder === "asc"
              ? a.level.localeCompare(b.level)
              : b.level.localeCompare(a.level);
          }
        }

        return 0;
      })
    : filteredEmployees || [];

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => employees.filter((employee) => employee._id !== id));
    setFilteredEmployees((filteredEmployees) =>
      filteredEmployees.filter((employee) => employee._id !== id)
    );
  };

  if (loading) {
    return <Loading />;
  }

  const uniquePositions = [...new Set(employees.map((employee) => employee.position))];
  const uniqueLevels = [...new Set(employees.map((employee) => employee.level))];

  return (
    <div>
      <div className="header">
      <EmployeeSortingButtons onSort={sortEmployees} />
      </div>
      <div className="filters">
      <FilterDropdown
          id="positionFilter"
          label="Position:  "
          options={uniquePositions}
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
        />
        <FilterDropdown
          id="levelFilter"
          label="Level: "
          options={uniqueLevels}
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
        />
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
      </div>
      <div className="table">
      <EmployeeTable employees={sortedEmployees} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default EmployeeList;
