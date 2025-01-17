const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub : user.id, iat : timestamp },config.secret);
}

exports.signup = function(req,res,next) {
    console.log(req);
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) {
        return res.status(422).send({ error : 'You must provide a username and a password.'})    
    }

    User.findOne({ username : username}, function(err,existingUser){
        if(err){
            return next(err);
        }

        if(existingUser) {
            return res.status(422).send({ error : 'Username is in use!'});
        }

        const user = new User({
            username : username,
            password : password
        });

        user.save(function(err){
            if(err) {
                return next(err);
            }
            res.json({ token : tokenForUser(user) });
        })
    });
}   

exports.login = function(req,res,next) {
    res.send({ token : tokenForUser(req.user) }); 
}