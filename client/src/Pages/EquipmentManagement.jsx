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
    <div className="equipment-management">
      <h1>Equipment Management</h1>
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          name="name"
          placeholder="Equipment Name"
          value={newEquipment.name}
          onChange={handleInputChange}
        />
        <input
          className="input-field"
          type="number"
          name="amount"
          placeholder="Amount"
          value={newEquipment.amount}
          onChange={handleInputChange}
        />
        <button className="create-button" onClick={handleCreateEquipment}>
          Create Equipment
        </button>
        <button onClick={() => navigate("/")}>Cancel</button>
      </div>
      <div className="equipment">
      {equipmentList.length === 0 ? (
        <p>No equipments found.</p>
      ) : (
        <table className="equipmentTable">
          <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
          </tr>
        </thead>
          <tbody>
            {equipmentList.map((eq) => (
              <tr key={eq._id}>
                <td>{eq.name}</td>
                <td>{eq.amount}</td>
                <td>
                  <button type="button" onClick={() => handleDelete(eq._id)}>
                    Remove
                  </button>
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
