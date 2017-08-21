const bcrypt = require('bcrypt');

const validator = require('validator');

const mongoose = require('mongoose');

const _ = require('lodash');

const jwt = require('jsonwebtoken');

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
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  }],
});

UserSchema.methods.toJSON = function () {
  const user = this;
  return _.pick(user.toObject(), ['_id', 'email']);
};

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

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toHexString(), access }, 'superdopesecretkey').toString();
  console.log(token);
  user.tokens.push({ access, token });

  return user.save().then(() => token);
};

UserSchema.methods.removeAuthToken = function (token) {
  const user = this;
  return user.update({
    $pull: {
      tokens: { token },
    },
  });
};

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'superdopesecretkey');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
};

UserSchema.statics.findUserByCredentials = function (email, password) {
  const User = this;
  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (!res) {
          reject();
        }
        resolve(user);
      });
    });
  });
};

const User = mongoose.model('User', UserSchema);


module.exports = { User };
