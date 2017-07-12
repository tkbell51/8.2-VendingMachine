const mongoose = require('mongoose');

const customerItemSchema = new mongoose.Schema({

    id: Number,
    description: String,
    quantity: Number,
    money_required: Number,
    money_given: Number

},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

const CustomerItem = mongoose.model("CustomerItem", customerItemSchema);

module.exports = CustomerItem
