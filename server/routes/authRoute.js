const router = require('express').Router();
const bcrypt = require('bcrypt');
const checkLoggedIn = require('./middleware/checkLoggedIn');

const { UserQ } = require('../db/query-api');

router.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        return UserQ.addUser(name, password, email)
            .then(user => req.login(user, error => {
                if (error) {
                    console.log(error)
                    throw error;
                }

                const { password, ...auth } = user.dataValues;
                return res.json({ auth });
            })
        )
    } catch (error) {
        res.status(403).send({ error: new Error('Username or email already in use.') });
    }
});

router.post('/api/log-in', (req, res) => {
    const { email, password } = req.body;

    return UserQ.findUserBy("email", email).then(user => {
        bcrypt.compare(password, user.password_hash).then(isEqual => {
            if (isEqual) {
                return user;
            } else {
                return res.status(401).send({ error: new Error('Invalid password') });
            }
        }).then(user => req.login(user, error => {
            if (error) {
                return error;
            }

            const { password, ...auth } = user.dataValues;
            return res.json({ auth });
        }))
    });
});

router.post('/api/log-out', (req, res) => {
    req.logout();
    req.session.destroy();
    res.sendStatus(200);
    return null;
})