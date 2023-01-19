exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('product_images').del()
  await knex('products').del()
  await knex('product_categories').del()
  await knex('users').del()
  await knex('reviews').del()
};
