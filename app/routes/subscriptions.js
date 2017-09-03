const { Router } = require('express');

const router = Router();

const _ = require('lodash');

const { ObjectID } = require('mongodb');

const { Subscription } = require('./../models/Subscription');

const { SubscriptionPlan } = require('./../models/SubscriptionPlan');

const { auth } = require('./../middlewares/auth');


router
  .post('/purchase', auth, (req, res) => {
    const body = _.pick(req.body, ['plan']);
    if (!ObjectID.isValid(body.plan)) {
      return res.status(404).send();
    }
    return SubscriptionPlan.findById(body.plan).then((result) => {
      if (!result) {
        throw new Error();
      }
      const purchaseDate = new Date().getTime();
      const subscription = new Subscription({
        owner: req.user._id,
        plan: body.plan,
        purchaseDate,
      });

      return subscription.save();
    }).then((subscriptionResult) => {
      res.send(subscriptionResult);
    }).catch((err) => {
      res.status(404).send(err);
    });
  });

module.exports = router;
