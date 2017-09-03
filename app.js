const express = require('express');

const bodyParser = require('body-parser');

require('./config/mongoose');


const app = express();

const userRoute = require('./app/routes/users');

const subscriptionPlansRoute = require('./app/routes/subscriptionPlans');
const subscriptionRoute = require('./app/routes/subscriptions');

app.use(bodyParser.json());
app.use('/users', userRoute);
app.use('/plans', subscriptionPlansRoute);
app.use('/subscriptions', subscriptionRoute);

app.listen(3001, () => {
  console.log('Server started at port 3000');
});


module.exports = { app };

