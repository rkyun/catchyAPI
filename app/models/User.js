const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    type: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next){
    let user = this;
    if(user.isModified('password', UserSchema)){
        bcrypt.hash(user.password, 10).then((hash)=>{
            user.password = hash;
            next();
        }).catch((e)=>{
            var err = new Error("Hashing password gone wrong");
            err._message = "Hashing password gone wrong";  
            next(err);
        });
    } else {
        next();
    }
});

let User = mongoose.model('User', UserSchema);


module.exports = { User }