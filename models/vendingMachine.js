const mongoose = require('mongoose');

const vendingMachineSchema = new mongoose.Schema({
  status: Boolean
  price: Number,
  quantity: Number,
  description: String,
  transaction: Date
})

const VendingMachine = mongoose.model("VendingMachine", vendingMachineSchema);

module.exports = VendingMachine
