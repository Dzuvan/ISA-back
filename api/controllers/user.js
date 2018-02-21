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
            return res.status(201).json({
              message: 'User created',
            });
          })
          .catch((errr) => {
            return status(500).json({
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
        return res.status(401).json({
          message: 'Auth failed',
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      return res.status(200).json({
        message: 'User removed.',
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};
