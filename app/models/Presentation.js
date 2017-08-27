const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PresentationSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subscription: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  accessKey: {
    type: String,
    minlength: 4,
    maxlength: 4,
    unique: true,
    required: true,
  },
  options: {
    participantsLimit: {
      type: Number,
      required: true,
    },
    pollsLimit: {
      type: Number,
      required: true,
    },
    questionsEnabled: {
      type: Boolean,
      required: true,
    },
    questionsModeratable: {
      type: Boolean,
      require: true,
    },
    questionsModerated: {
      type: Boolean,
      required: true,
    },
    slidesEnabled: {
      type: Boolean,
      required: true,
    },
    slidesLimit: {
      type: Number,
      required: true,
    },
  },

});

const Presentation = mongoose.model('Presentation', PresentationSchema);

module.exports = { Presentation };
