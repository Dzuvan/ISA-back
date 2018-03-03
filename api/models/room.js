const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  establishment: {
    type: mongoose.Schema.Types.ObjectId,
    refs: 'Establishment',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('Room', roomSchema);
