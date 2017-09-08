const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const { ObjectID } = require('mongodb');

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  status: {
    type: String,
    default: 'Pending', // Rejected, Pending, Accepted
    required: true,
  },
  presentation: {
    type: Schema.Types.ObjectId,
    ref: 'Presentation',
    required: true,
  },
});

QuestionSchema.statics.findByPresentationId = function (id) {
  const Question = this;
  if (!ObjectID.isValid(id)) {
    return Promise.reject();
  }

  return Question.find({ presentation: id });
};

const Question = mongoose.model('Question', QuestionSchema);

module.exports = { Question };
