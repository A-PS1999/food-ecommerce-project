const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: path.join(__dirname, '..','..','..', '.env') });

const adminHash = bcrypt.hashSync(process.env.ADMIN_ACC_PASS, 10)

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      name: process.env.ADMIN_ACC_USER, 
      password_hash: adminHash,
      email: process.env.ADMIN_ACC_EMAIL,
      is_admin: true
    },
  ]);
};
