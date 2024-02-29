import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  height: Number,
  brand: String,
  created: {
    type: Date,
    default: Date.now,
  },
  missing: false,
});

export default model("Employee", EmployeeSchema);
