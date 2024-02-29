import mongoose from 'mongoose'; 

const { model, Schema  } = mongoose;

const equipmentSchema = new Schema({
    name: String,
    type: String,
    amount: Number,
})

const Equipment = model('Equipment', equipmentSchema);

export default Equipment;