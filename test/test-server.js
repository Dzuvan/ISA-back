process.env.NODE_ENV = 'test';

var request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const configuration = require('config');

const controller = require('../api/controllers/user');
const server = require('../server');
const User = require('../api/models/user');

const should = chai.should();
chai.use(chaiHttp);

before(function(done) {
  mockgoose.prepareStorage().then(function() {
    mongoose.connect('mongodb://sys:'+ configuration.MONGO_ATLAS_PW + '@node-isa-shard-00-00-i1kmg.mongodb.net:27017,node-isa-shard-00-01-i1kmg.mongodb.net:27017,node-isa-shard-00-02-i1kmg.mongodb.net:27017/test?ssl=true&replicaSet=node-isa-shard-0&authSource=admin', function(err) {
      done(err);
    });
  }).catch((err) => {
    console.log(err)
  });
});

describe('Users Test', function() {

  it('should have status 200 on / GET', function(done) {
    this.timeout(10000);
    const userStub = sinon.stub(controller, "users_get_all").callsFake(function(req, res, next){
      res.status(200).json({ stubbed: 'data' });
    });
    request(server)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });

  it('should have status 200 on /:id GET', function(done) {
    const userStub = sinon.stub(controller, "users_get_one").callsFake(function(req, res, next){
      res.status(200).json();
    });
    request(server)
      .get('/users/')
      .query({ userId:'5a91caf5ae438f3a732a85df' })
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });

  it('should show status 201 on /signup POST', function(done) {
    this.timeout(10000);
    const userStub = sinon.stub(controller, "user_signup").callsFake(function(req, res, next){
      res.status(201).json({
          _id: mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          city: req.body.city,
          phone: req.body.phone,
      });
    });
    const user = new User({ _id:mongoose.Types.ObjectId(),
      email:'proba@proba.com',
      password:'test',
      firstName:'proba',
      lastName:'proba',
      city:'probaCity',
      phone:'12346798'
    });
    request(server)
      .post('/users/signup')
      .set('Accept', 'application/json')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });
});
