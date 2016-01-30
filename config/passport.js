var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    userController = require('../app/controllers/user');

//Serialize sessions
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    if (user) {
        done(null, user);
    } else {
        done(new Error('User  does not exist'));
    }
});

//Use local strategy
passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, done) {
        password = new Buffer(password).toString('base64');
        userController.authenticate({
            loginId: username,
            password: password,
            orgId: 2
        }, function(user) {
            if (user.status === 'failure') {
                done(null, false, {
                    message: 'Unknown user'
                });
            } else {
                done(null, user);
            }
        });
    }
));

passport.use("signup", new LocalStrategy({
        passReqToCallback: true
    },
    function(req, username, password, done) {
        return done(null, req.resp);
    }
));

module.exports = passport;
