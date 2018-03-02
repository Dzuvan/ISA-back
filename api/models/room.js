const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
  _id: mongoose.Chema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  seatNumber: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('Room', roomSchema);
