import { useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [brand, setBrand] = useState(employee?.brand ?? "");
  const [height, setHeight] = useState(employee?.height ?? "");

  const isEditing = Boolean(employee);

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = { name, level, position, brand, height };

    if (isEditing) {
      return onSave({ ...employee, ...payload });
    }

    return onSave(payload);
  };

  return (
    <div className="form-page">
      <div className="card form-card">
        <div className="form-card-head">
          <h2>{isEditing ? "Update Employee" : "New Employee"}</h2>
          <p className="muted">
            {isEditing
              ? "Edit the details below and save your changes."
              : "Fill in the details to add an employee."}
          </p>
        </div>

        <form className="EmployeeForm" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              id="name"
              placeholder="Jane Doe"
            />
          </div>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="level">Level</label>
              <input
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                name="level"
                id="level"
                placeholder="Senior"
              />
            </div>

            <div className="field">
              <label htmlFor="position">Position</label>
              <input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                name="position"
                id="position"
                placeholder="Engineer"
              />
            </div>

            <div className="field">
              <label htmlFor="brand">Brand</label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                name="brand"
                id="brand"
                placeholder="Acme"
              />
            </div>

            <div className="field">
              <label htmlFor="height">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                name="height"
                id="height"
                placeholder="175"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" disabled={disabled}>
              {isEditing ? "Save Changes" : "Create Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
