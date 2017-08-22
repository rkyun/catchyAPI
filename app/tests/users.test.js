const request = require('supertest');

const expect = require('expect');

const { app } = require('./../../app');

const { User } = require('./../models/User.js');

const { users, populateUsers } = require('./seeds');

beforeEach(populateUsers);


describe('Post /users', () => {
  it('should create new user with valid data and create token', (done) => {
    const user = {
      name: 'Michal',
      email: 'michal@gmail.com',
      password: '123456aaa',
      type: 'couch',
    };
    request(app)
      .post('/users')
      .send(user)
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
      })
      .end(done);
  });

  it('should not create user if invalid data', (done) => {
    const user = {
      name: 'Michal',
      email: 'invalid@',
      password: '123',
      type: 'couch',
    };

    request(app)
      .post('/users')
      .send(user)
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end(done);
  });

  it('should not create new user if already exist', (done) => {
    request(app)
      .post('/users')
      .send(users[0])
      .expect(400)
      .end(done);
  });
});

describe('GET /users', () => {
  it('should respond 401 if user is not authenticated', (done) => {
    request(app)
      .get('/users')
      .expect(401)
      .end(done);
  });

  it('should respond 200 if user is authenticated', (done) => {
    request(app)
      .get('/users')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login user with valid credentials', (done) => {
    request(app)
      .post('/users/login')
      .send({ email: users[0].email, password: users[0].password })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
      })
      .end(done);
  });

  it('should not login user with invalid credentials', (done) => {
    request(app)
      .post('/users/login')
      .send({ email: users[0].email, password: `${users[0].password}r0r` })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end(done);
  });
});


describe('DELETE /users/logout', () => {
  it('should logout user', (done) => {
    request(app)
      .delete('/users/logout')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end(done);
  });
});
