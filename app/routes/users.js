const { Router } = require('express');

const _ = require('lodash');

const router = Router();
const { User } = require('./../models/User');

const { auth } = require('./../middlewares/auth');


router
  .get('/', auth, (req, res) => {
    res.send(`hello ${req.user.name}`);
  })
  .post('/', (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      type: req.body.type,
    });
    user.save().then(() => user.generateAuthToken()).then((token) => {
      res.set('x-auth', token).send(user);
    }).catch((e) => {
      res.status(400).send(e);
    });
  })
  .post('/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    User.findUserByCredentials(body.email, body.password)
      .then(user => user.generateAuthToken().then((token) => {
        res.set('x-auth', token).send({ user });
      })).catch(() => {
        res.status(400).send({});
      });
  })
  .delete('/logout', auth, (req, res) => {
    req.user.removeAuthToken(req.token).then(() => {
      res.send();
    }).catch((err) => {
      res.status(400).send(err);
    });
  });


module.exports = router;
