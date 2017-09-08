const { Router } = require('express');

const router = Router();

const { Question } = require('./../models/Question');

const { ObjectID } = require('mongodb');

const { auth } = require('./../middlewares/auth');

const _ = require('lodash');

router
  .post('/', (req, res) => {
    const body = _.pick(req.body, ['question', 'presentation']);
    if (!ObjectID.isValid(body.presentation)) {
      return res.status(404).send();
    }

    const question = new Question(body);

    return question.save().then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(404).send(err);
    });
  })
  .patch('/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['status']);
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    if (body.status !== 'Rejected' && body.status !== 'Pending' && body.status !== 'Accepted') {
      return res.status(404).send();
    }

    return Question.findByIdAndUpdate(id, {
      $set: {
        status: body.status,
      },
    }, { new: true }).then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(404).send(err);
    });
  })
  .patch('/:id/:action', (req, res) => {
    const id = req.params.id;
    const action = req.params.action;

    if (action !== 'like' && action !== 'dislike') {
      return res.status(404).send();
    }

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    let change = 1;
    if (action === 'dislike') {
      change = -1;
    }

    return Question.findByIdAndUpdate(id, {
      $inc: {
        likes: change,
      },
    }, { new: true }).then((result) => {
      if (!result) {
        return res.status(404).send();
      }
      return res.send(result);
    }).catch((err) => {
      res.status(404).send(err);
    });
  })
  .delete('/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    return Question.findByIdAndRemove(id).then((result) => {
      if (!result) {
        return res.status(404).send();
      }
      return res.send(result);
    }).catch((err) => {
      res.status(404).send(err);
    });
  })
  .get('/:presentationId', (req, res) => {
    const id = req.params.presentationId;

    if (!ObjectID.isValid(id)) {
      console.log('test');
      return res.status(404).send();
    }
    return Question.findByPresentationId(id).then((questions) => {
      if (!questions) {
        return res.status(404).send();
      }
      return res.send(questions);
    }).catch((err) => {
      console.log('test2');
      res.status(404).send(err);
    });
  });

module.exports = router;
