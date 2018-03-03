const mongoose = require('mongoose');

const Show = require('../models/show');

exports.shows_get_all = (req, res, next) => {
  Show.find()
    .select()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        shows: docs.map(doc => ({
          _id: doc._id,
          name: doc.name,
          genre: doc.genre,
          length: doc.length,
          rating: doc.rating,
          poster: doc.poster,
          description: doc.description,
          actors: doc.actors,
          projection: doc.projection,
          price: doc.price,
          director: doc.drector,
          rooms: doc.rooms,
          request: {
            type: 'GET',
            url: `http://localhost:3000/shows/${doc._id}`,
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

exports.shows_add_one = (req, res, next) => {
  const show = new Show({
    _id: new mongoose.Types.ObjectId(),
    name: req.name,
    genre: req.genre,
    length: req.length,
    rating: req.rating,
    poster: req.file.path,
    description: req.description,
    actors: req.actors,
    projection: req.projection,
    price: req.price,
    director: req.drector,
    rooms: req.rooms,
  });
  show.save()
    .then((result) => {
      res.staus(201).json({
        message: 'Created show',
        createdShow: {
          _id: result._id,
          name: result.name,
          genre: result.genre,
          length: result.length,
          rating: result.rating,
          poster: result.file.path,
          description: result.description,
          actors: result.actors,
          projection: result.projection,
          price: result.price,
          director: result.drector,
          rooms: result.rooms,
          request: {
            type: 'GET',
            url: `http://localhost:3000/shows/${result._id}`,
          },
        },
      });
    }).catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.shows_get_one = (req, res, next) => {
  const id = req.params.showId;
  Show.findById(id)
    .select()
    .exec()
    .then((doc) => {
      if (doc) {
        return res.status(200).json({
          show: doc,
          request: {
            type: 'GET',
            description: 'Get all shows',
            url: 'http://localhost:3000/shows/',
          },
        });
      }
      res.status(404).json({ message: 'No valid show found' });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.shows_update_one = (req, res, next) => {
  const id = req.params.showId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Show.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => res.status(200).json({
      message: 'Show updated.',
      request: {
        type: 'GET',
        url: `http://localhost:3000/shows/${id}`,
      },
    }))
    .catch((err) => {
      res.staus(500).json({
        error: err,
      });
    });
};

exports.shows_delete_one = (req, res, next) => {
  const id = req.params.showId;
  Show.remove({ _id: id })
    .exec()
    .then(result => res.status(200).json({
      message: 'Show deleted',
      request: {
        type: 'POST',
        url: 'http://loclahost:3000/shows',
      },
    }))
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
