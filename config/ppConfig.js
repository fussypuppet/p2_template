// import necessary libraries and modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

// serialize user
passport.serializeUser(function(user, cb) {  //cb is not a special word.  can also use 'callback'
    cb(null, user.id);
})

// deserialized version
passport.deserializeUser(function(id, cb) {
    db.user.findByPk(id).then(function(user){
        cb(null, user);
    }).catch(cb);
})

// passport local config
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, callback){
    db.user.findOne({
        where: { email }
    })
    .then(function(user){
        if (!user || !user.validPassword(password)) {
            callback(null, false);
        } else {
            callback(null, user);
        }
    }).catch(callback);
}));

module.exports = passport;