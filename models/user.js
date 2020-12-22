const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const User = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

User.pre('save',function(next){
    const user = this;
    bcrypt.genSalt(10,function(err,salt){
        if(err) {
            return next(err);
        }

        bcrypt.hash(user.password,salt,null,function(err,hash) {
            if(err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

User.methods.comparePassword = function(candidatePassword,callback){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) { return callback(err); }
        callback(null,isMatch);
    });
}

module.exports = mongoose.model('User',User);