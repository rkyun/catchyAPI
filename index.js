const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { mongoose } = require('./config/mongoose');

const userRoute = require('./app/routes/users');


app.use(bodyParser.json())
app.use('/users', userRoute);


app.listen(3000, ()=>{
    console.log('Server started at port 3000');
});
