const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const SubscriptionSchema = new Schema({
  plan: {
    type: Schema.Types.ObjectId,
    ref: 'SubscriptionPlan',
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  activated: {
    type: Boolean,
    default: false,
  },
  activationDate: {
    type: Date,
    default: null,
  },
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = { Subscription };
