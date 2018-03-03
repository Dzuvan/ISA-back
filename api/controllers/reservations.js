const mongoose = require('mongoose');

const Reservation = require('../models/reservation');

exports.reservations_get_all = (req, res, next) => {
  Reservation.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        reservations: docs.map(doc => ({
          _id: doc._id,
          user: doc.user,
          date: doc.date,
          quantity: doc.quantity,
          establishment: doc.establishment,
          request: {
            type: 'GET',
            url: `http://localhost:3000/reservations/${doc._id}`,
          },
        })),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.reservations_add_one = (req, res, next) => {
  const reservation = new Reservation({
    _id: new mongoose.Types.ObjectId(),
    user: req.body.user,
    date: req.body.date,
    quantity: req.body.quantity,
    establishment: req.body.establishment,
  });
  reservation
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Created reservation',
        createdReservation: {
          _id: result._id,
          user: result.user,
          date: result.date,
          quantity: result.quantity,
          establishment: result.establishment,
          reqeust: {
            type: 'GET',
            url: `http://localhost:3000/reservations/${result._id}`,
          },
        },
      });
    }).catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};


exports.reservations_get_one = (req, res, next) => {
  const id = req.params.reservationId;
  Reservation.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        return res.status(200).json({
          reservation: doc,
          request: {
            type: 'GET',
            description: 'Get all products',
            url: 'http://localhost:3000/reservations',
          },
        });
      }
      res.status(404).json({ message: 'No valid reservation found' });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.reservations_update_one = (req, res, next) => {
  const id = req.params.reservationId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Reservation.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => res.status(200).json({
      message: 'Reservation updated',
      request: {
        type: 'GET',
        url: `http://localhost:3000/reservations/${id}`,
      },
    }))
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.reservations_delete_one = (req, res, next) => {
  const id = req.params.reservationId;
  Reservation.remove({ _id: id })
    .exec()
    .then(result => res.status(200).json({
      message: 'Reservation deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/reservations',
      },
    }))
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
