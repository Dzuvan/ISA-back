const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  projection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projection',
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Room',
  },
  seat: {
    type: Number,
    required: true,
  },
  row: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Ticket', ticketSchema);
