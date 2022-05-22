const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..','..','..', '.env') });

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1, 
      name: process.env.ADMIN_ACC_USER, 
      password_hash: process.env.ADMIN_ACC_PASS,
      email: process.env.ADMIN_ACC_EMAIL,
      is_admin: true
    },
  ]);
};
