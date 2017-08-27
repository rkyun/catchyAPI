const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubscriptionTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
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
    questionsModeratable: {
      type: Boolean,
      require: true,
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

const SubscriptionType = mongoose.model('SubscriptionType', SubscriptionTypeSchema);

module.exports = { SubscriptionType };
