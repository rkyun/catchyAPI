const request = require('supertest');

const expect = require('expect');

const { app } = require('./../../app');


describe('Post /user', () => {
  it('should create new user with valid data', (done) => {
    const user = {
      name: 'Michal',
      email: 'michalsssssssss123@gmail.com',
      password: '123456aaa',
      type: 'instruktor',
    };
    request(app)
      .post('/users')
      .send(user)
      .expect(200)
      .end(done);
  });
});

