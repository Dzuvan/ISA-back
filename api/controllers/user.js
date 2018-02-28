const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((userData) => {
      if (userData.length >= 1) {
        return res.status(409).json({
          message: 'Email exists.',
        });
      }
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }
        const user = new User({
          _id: mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          city: req.body.city,
          phone: req.body.phone,
        });
        user.save()
          .then((result) => {
            res.status(201).json({
              message: 'User created',
            });
          }).catch((errr) => {
            res.status(500).json({
              error: errr,
            });
          });
      });
    });
};

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed',
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: '12h',
            },
          );
          return res.status(200).json({
            message: 'Auth successful',
            token,
          });
        }
        res.status(401).json({
          message: 'Auth failed',
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'User removed.',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.users_get_all = (req, res, next) => {
  User.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        users: docs.map(doc => ({
          _id: doc._id,
          email: doc.email,
          password: doc.password,
          firstName: doc.firstName,
          lastName: doc.lastName,
          city: doc.city,
          phone: doc.phone,
          request: {
            type: 'GET',
            url: `http://localhost:3000/user/${doc._id}`,
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

exports.users_get_one = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select()
    .exec()
    .then((doc) => {
      if (doc) {
        return res.status(200).json({
          user: doc,
          request: {
            type: 'GET',
            description: 'Get all users',
            url: 'http://localhost:3000/users',
          },
        });
      }
      res.status(404).json({ message: 'No user found' });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
