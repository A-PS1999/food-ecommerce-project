const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { UserQ } = require('./db/query-api');

const checkPassword = function(user, password) {
    bcrypt.compare(password, user.password).then(isEqual => {
        if (isEqual) {
            return user;
        } else {
            return Promise.reject(new Error('Password is invalid'));
        }
    });
};

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) =>
    UserQ.findUserBy('id', id)
        .then(user => done(null, user))
        .catch(error => done(error, {}))
)

passport.use(new LocalStrategy(
    function(username, password, done) {
        UserQ.findUserBy("name", username)
            .then(user => {
                if (user) {
                    return checkPassword(user, password)
                        .then(user => done(null, user))
                        .catch(error => done(null, false, error.message));
                } else {
                    return done(null, false, { message: 'Username is incorrect' });
                }
            }
        ).catch(error => done(null, false, error.message));
    }
))

const authRedirects = {
    successRedirect: '/',
    failureRedirect: '/login',
};

module.exports = {
    passport,
    authenticate: passport.authenticate('local', authRedirects),
};