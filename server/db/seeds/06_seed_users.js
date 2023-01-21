const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').insert([
    {
      name: "TestUser1",
      password_hash: await bcrypt.hash("unimportant_password", 10),
      email: "fakeemail1@fakemail.com",
      is_admin: false
    },
    {
      name: "TestUser2",
      password_hash: await bcrypt.hash("password_wordpass", 10),
      email: "notreal@123mail.gov",
      is_admin: false
    },
    {
      name: "TestUser3",
      password_hash: await bcrypt.hash("string", 10),
      email: "testmail@testmail.net",
      is_admin: false
    },
    {
      name: "TestUser4",
      password_hash: await bcrypt.hash("loremipsum", 10),
      email: "sitamet@fakelatin.jp",
      is_admin: false
    },
    {
      name: "TestUser5",
      password_hash: await bcrypt.hash("contrasena", 10),
      email: "emailfalso@gmail.es",
      is_admin: false
    },
  ]);
};
