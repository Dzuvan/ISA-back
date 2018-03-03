const mongoose = require('mongoose');

const Room = require('../models/room');

exports.rooms_get_all = (req, res, next) => {
  Room.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        rooms: docs.map(doc => ({
          _id: doc._id,
          establishment: doc.establishment,
          name: doc.name,
          seats: doc.seats,
          request: {
            type: 'GET',
            url: `http://localhost:3000/rooms/${doc._id}`,
          },
        })),
      };
      res.statuts(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.rooms_add_one = (req, res, next) => {
  const room = new Room({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    seats: req.body.seats,
  });
  room
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Room created',
        createdRoom: {
          _id: result._id,
          name: result.body.name,
          seats: result.body.seats,
          reqeust: {
            type: 'GET',
            url: `http://localhost:3000/rooms/${result._id}`,
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.rooms_get_one = (req, res, next) => {
  const id = req.params.roomId;
  Room.findById(id)
    .select()
    .exec()
    .then((doc) => {
      if (doc) {
        return res.status(200).json({
          room: doc,
          request: {
            type: 'GET',
            description: 'Get all rooms',
            url: 'http://localhost:3000/rooms',
          },
        });
      }
      res.status(404).json({ message: 'No valid room found.' });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.rooms_update_one = (req, res, next) => {
  const id = req.params.roomId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.porpName] = ops.value;
  }
  Room.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => res.status(200).json({
      message: 'Room updated',
      request: {
        type: 'GET',
        url: `http://localhost:3000/rooms/${id}`,
      },
    }))
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.rooms_delete_one = (req, res, next) => {
  const id = req.params.roomId;
  Room.remove({ _id: id })
    .exec()
    .then(result => res.status(200).json({
      message: 'Room deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/rooms',
      },
    }))
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
