const jwt = require('jsonwebtoken');

const { ObjectID } = require('mongodb');

const { User } = require('./../models/User');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  name: 'User One',
  email: 'userone@test.com',
  password: 'test123',
  type: 'couch',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access: 'auth' }, 'superdopesecretkey').toString(),
  }],
},
{
  _id: userTwoId,
  name: 'User One',
  email: 'usertwo@test.com',
  password: 'test123',
  type: 'couch',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access: 'auth' }, 'superdopesecretkey').toString(),
  }],
}];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = { users, populateUsers };
