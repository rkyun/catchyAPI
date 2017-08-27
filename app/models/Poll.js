const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PollSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: Number, // index of corret answer from answers[]
    default: null,
  },
  presentation: {
    type: Schema.Types.ObjectId,
    ref: 'Presentation',
    required: true,
  },
});

const Poll = mongoose.model('Poll', PollSchema);

module.exports = { Poll };
