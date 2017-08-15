const { Router } = require('express');
const router = Router();
const { User } = require('./../models/User');



router
  
  .get('/', function(req, res){
    res.send('hello');
  })

 
  
  

module.exports = router;
