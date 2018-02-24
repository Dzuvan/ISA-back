const mongoose = require('mongoose');

const showSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  genre: { type: String, required: true },
  length: { type: Number, required: true },
  rating: { type: Number, required: true },
  poster: { type: String },
  description: { type: String, required: true },
  actors: { type: Array, required: true },
  projections: { type: Array, required: true },
  price: { type: Number, required: true },
  director: { type: String, required: true },
  rooms: { type: Array, required: true },
});

module.exports = mongoose.model('Show', showSchema);
