const router = require('express').Router();
const bcrypt = require('bcrypt');
const checkLoggedIn = require('./middleware/checkLoggedIn');
const sendAuth = require('./middleware/sendAuth');

const { UserQ } = require('../db/query-api');

router.get('/api/authenticate', checkLoggedIn, sendAuth);

router.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await UserQ.addUser(name, password, email);
        req.login(user, error => {
            if (error) {
                console.log(error);
                throw error;
            }
        });

        return res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(403).send({ error: new Error('Username or email already in use.') });
    }
});

router.post('/api/log-in', (req, res) => {
    const { email, password } = req.body;

    return UserQ.findUserBy("email", email).then(user => {
        bcrypt.compare(password, user[0].password_hash).then(isEqual => {
            if (isEqual) {
                return user[0];
            } else {
                return res.status(401).send({ error: new Error('Invalid password') });
            }
        }).then(user => req.login(user, error => {
            if (error) {
                return error;
            }

            return res.json({ user });
        }))
    });
});

router.post('/api/log-out', (req, res) => {
    req.logout();
    req.session.destroy();
    res.sendStatus(200);
    return null;
})

module.exports = router;