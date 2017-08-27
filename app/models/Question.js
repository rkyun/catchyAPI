const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
  accepted: {
    type: Boolean,
    default: false,
    required: true,
  },
  presentation: {
    type: Schema.Types.ObjectId,
    ref: 'Presentation',
    required: true,
  },
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = { Question };
