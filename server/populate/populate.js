/*
Loading the .env file and creates environment variables from it
*/
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import names from "../populate/names.json" assert {
  type: "json",
}
import levels from "../populate/levels.json" assert {
  type: "json",
}
import positions from "../populate/positions.json" assert {
  type: "json",
}
import brands from "../populate/brands.json" assert {
  type: "json"
}
import EmployeeModel from "../db/employee.model.js"

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];
const setHeight = () => {
  return Math.floor(Math.random() * 50) + 140;
}

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    height: setHeight(),
    brand: pick(brands)
  }));

   // Set random height for each employee


  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
