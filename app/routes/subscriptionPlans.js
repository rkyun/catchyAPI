const { Router } = require('express');

const { ObjectID } = require('mongodb');

const router = Router();

const _ = require('lodash');

const { SubscriptionPlan } = require('./../models/SubscriptionPlan');

router
  .post('/', (req, res) => {
    const body = _.pick(req.body, ['name', 'price', 'options']);
    const subscriptionPlan = new SubscriptionPlan(body);

    subscriptionPlan.save().then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(400).send(err);
    });
  })
  .get('/', (req, res) => {
    SubscriptionPlan.find().then((plans) => {
      if (!plans) {
        return res.send();
      }
      return res.send(plans);
    }).catch((err) => {
      res.status(400).send(err);
    });
  })
  .delete('/:id', (req, res) => {
    const _id = req.params.id;

    if (!ObjectID.isValid(_id)) {
      return res.status(404).send();
    }
    return SubscriptionPlan.findByIdAndRemove({ _id }).then((result) => {
      if (!result) {
        return res.status(404).send();
      }
      return res.send(result);
    }).catch(err => res.status(400).send(err));
  })
  .patch('/:id', (req, res) => {
    const body = _.pick(req.body, ['name', 'price', 'options']);
    const _id = req.params.id;
    if (!ObjectID.isValid(_id)) {
      return res.status(404).send();
    }
    return SubscriptionPlan.findByIdAndUpdate({ _id }, { $set: body }, { new: true })
      .then((result) => {
        if (!result) {
          return res.status(404).send();
        }
        return res.send(result);
      }).catch((err) => {
        res.status(400).send(err);
      });
  });


module.exports = router;
