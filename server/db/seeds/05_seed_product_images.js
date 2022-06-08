exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('product_images').del()
  const product_ids = await knex('products').pluck('id');
  await knex('product_images').insert([
    { image_url: '/product-images/weipa-id1.jpg', product_id: product_ids[0] },
    { image_url: '/product-images/mole-id2.jpg', product_id: product_ids[1] },
    { image_url: '/product-images/miso-id3.jpg', product_id: product_ids[2] },
    { image_url: '/product-images/charsiu-id4.jpg', product_id: product_ids[3] },
    { image_url: '/product-images/reynaverde-id5.jpg', product_id: product_ids[4] },
    { image_url: '/product-images/sesameoil-id6.jpg', product_id: product_ids[5] },
    { image_url: '/product-images/bragg-id7.jpg', product_id: product_ids[6] },
    { image_url: '/product-images/dryoregano-id8.jpeg', product_id: product_ids[7] },
    { image_url: '/product-images/thyme-id9.jpg', product_id: product_ids[8] },
    { image_url: '/product-images/anchopowder-id10.jpg', product_id: product_ids[9] },
    { image_url: '/product-images/yuzushichi-id11.jpg', product_id: product_ids[10] },
    { image_url: '/product-images/heinzket-id12.jpg', product_id: product_ids[11] },
    { image_url: '/product-images/hpsauce-id13.jpeg', product_id: product_ids[12] },
    { image_url: '/product-images/yumenishiki-id14.jpeg', product_id: product_ids[13] },
    { image_url: '/product-images/millet-id15.jpg', product_id: product_ids[14] },
    { image_url: '/product-images/kidneybeans-id16.jpg', product_id: product_ids[15] },
    { image_url: '/product-images/pintobeans-id17.jpg', product_id: product_ids[16] },
  ]);
};
