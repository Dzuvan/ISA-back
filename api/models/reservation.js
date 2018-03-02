const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  establishment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Establishment',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },

});

module.exports = mongoose.model('Reservation', reservationSchema);
