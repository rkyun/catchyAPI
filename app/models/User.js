const bcrypt = require('bcrypt');

const validator = require('validator');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: value => validator.isEmail(value),
      message: '{VALUE} is not valid email',
    },
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  type: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password', UserSchema)) {
    bcrypt.hash(user.password, 10).then((hash) => {
      user.password = hash;
      next();
    }).catch(() => {
      const err = new Error('Hashing password gone wrong');
      err._message = 'Hashing password gone wrong';
      next(err);
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);


module.exports = { User };
