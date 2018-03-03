const mongoose = require('mongoose');

const Ticket = require('../models/ticket');

exports.tickets_get_all = (req, res, next) => {
  Ticket.find()
    .select()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        tickets: docs.map(doc => ({
          _id: doc._id,
          projection: doc.projection,
          discount: doc.discount,
          price: doc.price,
          room: doc.room,
          seat: doc.seat,
          request: {
            type: 'GET',
            url: `http://localhost:3000/tickets/${doc._id}`,
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

exports.tickets_add_one = (req, res, next) => {
  const ticket = new Ticket({
    _id: new mongoose.Types.ObjectId(),
    projection: req.body.projection,
    discount: req.body.discount,
    price: req.body.price,
    room: req.body.room,
    seat: req.body.seat,
  });
  ticket
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Created ticket',
        createdTicket: {
          _id: result._id,
          projection: result.projection,
          discount: result.discount,
          price: result.price,
          room: result.room,
          seat: result.seat,
          reqeust: {
            type: 'GET',
            description: 'Get one tickets',
            url: `http://localhost:3000/tickets/${result._id}`,
          },
        },
      });
    }).catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.tickets_get_one = (req, res, next) => {
  const id = req.params.ticketId;
  Ticket.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        return res.status(200).json({
          ticket: doc,
          request: {
            type: 'GET',
            description: 'Get all tickets',
            url: 'http://localhost:3000/tickets',
          },
        });
      }
      res.status(404).json({ message: 'No valid ticket found' });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};


exports.tickets_update_one = (req, res, next) => {
  const id = req.params.ticketId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Ticket.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => res.status(200).json({
      message: 'Ticket updated',
      request: {
        type: 'GET',
        url: `http://localhost:3000/tickets/${id}`,
      },
    }))
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.tickets.delete_one = (req, res, next) => {
  const id = req.params.ticketId;
  Ticket.remove({ _id: id })
    .exec()
    .then(result => res.status(200).json({
      message: 'Ticket deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/tickets',
      },
    }))
    .catch((err) => {
      res.status(500).json({
        erro: err,
      });
    });
};
