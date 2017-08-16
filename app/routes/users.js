const { Router } = require('express');

const router = Router();
const { User } = require('./../models/User');


router
  .get('/', (req, res) => {
    res.send('hello');
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
  });


module.exports = router;
