/*
TODO(Jovan):
  - konfiguracija segmenata i mesta u salama
*/
const mongoose = require('mongoose');

const establishmentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s\d\/]*\d[a-zA-Z\s\d\/]*$/,
  },
  averageRating: { type: Number },
  seats: { type: Array, required: true },
  repertoire: { type: Array, required: true },
  establishmentType: { type: Number, required: true },
  discountedTickets: { type: Array, required: true },
  configurationOfSeats: { type: Array, required: true },
});

module.exports = mongoose.model('Establishment', establishmentSchema);
