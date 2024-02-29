import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import mongoose, { connect } from "mongoose";
import EmployeeModel from "../server/db/employee.model.js";
import Equipment from "../server/db/equipment.js";
import cors from "cors"

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const app = express();
app.use(json());
app.use(cors())

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});


app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.post("/api/equipment", (req, res) => {
  const { name, type, amount } = req.body;

  const newEquipment = new Equipment({ name, type, amount });

  newEquipment
    .save()
    .then((savedEquipment) => {
      res.json(savedEquipment);
    })
    .catch((error) => {
      console.error("Failed to save equipment:", error);
      res.status(500).json({ error: "Failed to save equipment" });
    });
});

app.delete('/api/equipment/:id', async (req, res) => {
  try {
    const equipmentId = req.params.id;

    const equipment = await Equipment.findById(equipmentId);

    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    await equipment.remove();
    res.json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete equipment' });
  }
});


app.get("/api/equipment", (req, res) => {
  Equipment.find()
    .then((equipment) => {
      res.json(equipment);
    })
    .catch((error) => {
      console.error("Failed to get equipment:", error);
      res.status(500).json({ error: "Failed to get equipment" });
    });
});

app.get("/employees/:search", async (req, res) => {
  const searchName = req.params.search;

  EmployeeModel.find({ name: { $regex: searchName, $options: "i" } })
    .then((employees) => {
      res.json(employees);
    })
    .catch((error) => {
      console.error("Failed to search employees:", error);
      res.status(500).json({ error: "Failed to search employees" });
    });
});

const main = async () => {
  await connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
