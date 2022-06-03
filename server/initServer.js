const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
const session = require('./db/session');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { passport } = require('./passport');

app.use(cors({
    origin: process.env.VITE_CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session);

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes'));

app.use(function(req, res, next) {
    res.status(404).send("Unable to find requested resource.")
});

app.use((err, req, res, next) => {
    if (err) {
        next(err);
    }
    res.status(err.status || 500).send(err.message);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});