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

const deleteUser = db => (id) => {
    return db("users").where('id', id).del();
}

const findUserBy = db => (field, value) => {
    return db("users").where({ [field]: value });
}

const getUsers = db => async (perPage, offset) => {
    const users = db("users").select(['id', 'name', 'is_admin'])
        .orderBy('name', 'asc')
        .limit(perPage)
        .offset(offset)
    const total = db("users").select(db.raw('count(id) as total'))
    return Promise.all([users, total]);
}

const getUserAndAddresses = db => (userId) => {
    return db("users").where('users.id', userId).select('*').leftJoin("addresses", function() {
        this
            .on('addresses.user_id', '=', 'users.id')
    })
}

module.exports = db => ({
    addUser: addUser(db),
    deleteUser: deleteUser(db),
    findUserBy: findUserBy(db),
    getUsers: getUsers(db),
    getUserAndAddresses: getUserAndAddresses(db),
})