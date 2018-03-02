const mongoose = require('mongoose');


const projectionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Room',
  },
});

module.exports = mongoose.model('Projection', projectionSchema);
