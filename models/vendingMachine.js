const mongoose = require('mongoose');

const vendingMachineSchema = new mongoose.Schema({

    id: Number,
    description: String,
    quantity: Number,
    price: Number,

},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

const VendingMachine = mongoose.model("VendingMachine", vendingMachineSchema);

module.exports = VendingMachine
