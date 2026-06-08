import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./styles/EquipmentManagementStyle.css";

const EquipmentManagement = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [newEquipment, setNewEquipment] = useState({
    name: "",
    amount: 0,
  });

  const navigate = useNavigate();

  const fetchEquipments = () => {
    fetch("/api/equipment")
      .then((response) => response.json())
      .then((data) => setEquipmentList(data))
      .catch((error) => console.error("Failed to fetch equipment:", error));
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  const handleInputChange = (e) => {
    setNewEquipment({
      ...newEquipment,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateEquipment = async () => {
    try {
      const response = await axios.post("/api/equipment", newEquipment, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const createdEquipment = response.data;
        if (createdEquipment.name === "" && createdEquipment.amount === 0) {
          console.log("Fields should not be empty");
        } else {
          setEquipmentList([...equipmentList, createdEquipment]);
          setNewEquipment({ name: "", amount: 0 });
        }
      } else {
        console.error("Failed to create equipment");
      }
    } catch (error) {
      console.error("Failed to create equipment:", error);
    }
  };

  const handleDelete = async (equipmentId) => {
    try {
      const response = await axios.delete(`/api/equipment/${equipmentId}`);

      if (response.status === 200) {
        setEquipmentList(equipmentList.filter((eq) => eq._id !== equipmentId));
      } else {
        console.error("Failed to delete equipment");
      }
    } catch (error) {
      console.error("Failed to delete equipment:", error);
    }
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Equipment</h1>
          <span className="subtitle">{equipmentList.length} items in inventory</span>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate("/")}>
          Back to Employees
        </button>
      </div>

      <div className="card toolbar equipment-toolbar">
        <input
          type="text"
          name="name"
          placeholder="Equipment name"
          value={newEquipment.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newEquipment.amount}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleCreateEquipment}>
          + Add Equipment
        </button>
      </div>

      <div className="card table-wrap">
        {equipmentList.length === 0 ? (
          <div className="empty-state">
            <h3>No equipment yet</h3>
            <p>Add your first item using the form above.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipmentList.map((eq) => (
                <tr key={eq._id}>
                  <td>
                    <strong>{eq.name}</strong>
                  </td>
                  <td>
                    <span className="badge badge-muted">{eq.amount}</span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(eq._id)}>
                        Remove
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

export default EquipmentManagement;
