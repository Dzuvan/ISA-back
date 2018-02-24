 process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const User = require('../api/models/user');
const server = require('../server');

const should = chai.should();
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiHttp);
chai.use(chaiAsPromised);

//TODO(Jovan): BeforeEach, AfterEach dummy user for testing purposes.

  describe(' users', function(done) {
    it('should list ALL users on / GET', function(done) {
      chai.request(server)
        .get('/users')
        .end(function(err,res) {
          res.should.have.status(200);
          done();
        });
      });

    it('should DELETE user on DELETE', function(done) {
      chai.request(server)
      .delete('/users/' + user._id)
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      })
    });

    it('should create SINGLE user on POST', function(done) {
      const user = new User({
        _id: mongoose.Types.ObjectId(),
        firstName: 'Test',
        lastName: 'Test',
        city: 'TestCity',
        phone: 1234578,
        email: 'test@test.com',
        password: 'test',
      });
      chai.request(server)
      .post('/users/signup')
      .send(user)
      .end(function(err, res) {
        res.should.have.status(201);
        done();
      });
    });
  });
