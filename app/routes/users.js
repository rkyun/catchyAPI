const { Router } = require('express');
const router = Router();
const { User } = require('./../models/User');



router
  .get('/', function(req, res){
    res.send('hello');
  })
  .post('/', (req, res)=>{
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      type: req.body.type
    });
    
    user.save().then((user)=>{
      res.send({user})
    }, (err)=>{
      res.status(400).send(err);
    })    
  });
  
  

module.exports = router;
