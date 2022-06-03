const bcrypt = require('bcrypt');
const BCRYPT_COST = 12;

const addUser = db => async (name, password_hash, email) => {
    const newUser = await db("users").returning(['id', 'name', 'password_hash', 'email', 'is_admin']).insert({
        name: name,
        password_hash: await bcrypt.hash(password_hash, BCRYPT_COST),
        email: email,
        is_admin: false
    });
    return newUser[0];
}

const findUserBy = db => (field, value) => {
    return db("users").where({ [field]: value });
}

module.exports = db => ({
    addUser: addUser(db),
    findUserBy: findUserBy(db)
})