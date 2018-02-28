process.env.NODE_ENV = 'test';

var request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const controller = require('../api/controllers/user');
const server = require('../server');

const should = chai.should();
chai.use(chaiHttp);

describe('Users Test', function() {
  this.timeout(10000);
  it('should show status 200 on / GET', function(done) {
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
});
