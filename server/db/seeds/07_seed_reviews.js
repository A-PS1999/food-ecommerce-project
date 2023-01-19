exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('reviews').del()
  const users = await knex('users').pluck('id');
  const products = await knex('products').pluck('id');

  await knex('reviews').insert([
    {
      rating: 80.00,
      review_body: "This Chinese seasoning paste is a standard in Japanese kitchen. It can be used to make a soup, fried rice, stir fry and more! \
        It makes a difference to your dish! Highly recommended!",
      product_id: products[0],
      user_id: users[0],
    },
    {
      rating: 100.00,
      review_body: "This is one of the best seasonings in the world and raved about by everyone who uses it. \
        I'm so happy to have found it again since I now reside in Canada.",
      product_id: products[0],
      user_id: users[1],
    },
    {
      rating: 70.00,
      review_body: "Lorem ipsum dolor sit amet",
      product_id: products[0],
      user_id: users[2],
    },
    {
      rating: 80.00,
      review_body: "これさえあれば簡単に中華料理ができるので便利です。チャーハンが簡単にお店の味になるのでとてもおすすめです。",
      product_id: products[0],
      user_id: users[3],
    },
    {
      rating: 40.00,
      review_body: "高いのに不味い。昔のチキンラーメンは美味しかったなぁ、と同じ感想。ただ塩辛いだけ。人工的な風味。",
      product_id: products[0],
      user_id: users[4],
    },
  ]);
};
