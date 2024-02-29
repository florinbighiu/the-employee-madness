import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";

const updateEmployee = async (employee) => {
  const res = await fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  return await res.json();
};

const fetchEmployee = async (id) => {
  const res = await fetch(`/api/employees/${id}`);
  return await res.json();
};

const EmployeeUpdater = () => {
  const { id, search } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedEmployee = await fetchEmployee(id);
        setEmployee(fetchedEmployee);
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdateEmployee = async (employee) => {
    try {
      setLoading(true);
      await updateEmployee(employee);
      navigate("/");
    } catch (error) {
      console.error("Error updating employee:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <EmployeeForm
      employee={employee}
      onSave={handleUpdateEmployee}
      disabled={loading}
      onCancel={() => navigate("/")}
    />
  );
};

export default EmployeeUpdater;
