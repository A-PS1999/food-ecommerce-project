const bcrypt = require('bcrypt');
const BCRYPT_COST = 12;

const addUser = db => (name, password_hash, email) => {
    return db("users").insert({
        name: name,
        password_hash: bcrypt.hash(password_hash, BCRYPT_COST),
        email: email,
        is_admin: false
    });
}

const findUserBy = db => (field, value) => {
    return db("users").where({ [field]: value });
}

module.exports = db => ({
    addUser: addUser(db),
    findUserBy: findUserBy(db)
})