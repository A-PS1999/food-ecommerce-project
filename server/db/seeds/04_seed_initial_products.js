exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  const category_ids = await knex('product_categories').pluck('id');

  await knex('products').insert([
    { 
      prod_name: "Weipa All-Purpose Chinese Seasoning 500g",
      description: "Weipa is a versatile Chinese stock used as seasoning for many Chinese dishes and Japanese-style Chinese foods. Weipa means 'king of taste' and consists of chicken and pork bones extract, and vegetables and spices mixed into a paste. In Japan, weipa is a popular seasoning used to make instant soups or add flavor and richness to dishes like fried rice, gyoza, and stir fries. This seasoning made of vegetables, spices, chicken, and pork bones adds a delicious and authentic Chinese flavor to your dishes.",
      price: 690,
      stock: 5,
      category_id: category_ids[8]
   },
   {
     prod_name: "La Costeña Mole Sauce 125g",
     description: "A complex and delicious sauce made with chocolate, nuts different chilli peppers and spices. Traditionally served on top of cooked turkey and chicken.",
     price: 215,
     stock: 8,
     category_id: category_ids[8]
   },
   {
     prod_name: "Hikari Miso 750g",
     description: "A delicious and mellow additive-free miso, made from 100% organic Japanese soybeans.",
     price: 686,
     stock: 3,
     category_id: category_ids[8]
   },
   {
     prod_name: "Lee Kum Kee Char Siu Sauce 397g",
     description: "This honey-sweet sauce is the secret to the authentic Chinese barbecued pork, also know as 'Char Siu'. This sauce is a great marinade for many kinds of meats and ribs, and makes it perfect for barbecue, roast, and oven baked dishes.",
     price: 280,
     stock: 15,
     category_id: category_ids[8]
   },
   {
     prod_name: "Mama Reyna Salsa Verde 100g",
     description: "A spicy-tangy tomatillo and green chilli sauce which can be used either to add a tasty kick to your normal meal or as a marinade for your favourite meat or vegetables.",
     price: 295,
     stock: 7,
     category_id: category_ids[8]
   },
   {
     prod_name: "Toasted Sesame Oil 250ml",
     description: "Toasted sesame seed oil. Great for stir fries and dressings.",
     price: 190,
     stock: 12,
     category_id: category_ids[7]
   },
   {
     prod_name: "Bragg Apple Cider Vinegar 473ml",
     description: "This organic, deliciously flavoured Bragg Organic Raw Apple Cider Vinegar is a perfect addition to any meal, including adding to a crisp salad or succulent vegetables. Bragg Organic Apple Cider Vinegar is made from delicious, organically grown apples.",
     price: 600,
     stock: 3,
     category_id: category_ids[7]
   },
   {
     prod_name: "Dried Oregano 12g",
     description: "Dried oregano, providing a great earthy flavour to your meals. Great for Italian food.",
     price: 90,
     stock: 14,
     category_id: category_ids[3]
   },
   {
     prod_name: "Dried Thyme 12g",
     description: "Dried thyme is a great addition to roasts, stews, dumplings and other savoury meals.",
     price: 85,
     stock: 10,
     category_id: category_ids[3]
   },
   {
     prod_name: "Ancho Chili Powder 100g",
     description: "Ancho is a medium-heat chilli with a very fruity and earthy flavour; widely used in Mexican cooking. Whether you're making salsas, sauces or stews, this chilli powder adds an incredible depth of flavour without any real heat.",
     price: 295,
     stock: 9,
     category_id: category_ids[4]
   },
   {
     prod_name: "House Shichimi Togarashi With Yuzu Citrus 14g",
     description: "Give your favourite noodle and rice dishes a refreshing heat, with a sprinkle of this aromatic, yuzu citrus-enriched togarashi red chilli pepper.",
     price: 359,
     stock: 2,
     category_id: category_ids[4]
   },
   {
     prod_name: "Heinz Tomato Ketchup 910g",
     description: "The classic Heinz tomato ketchup, perfect with a burger and chips",
     price: 295,
     stock: 20,
     category_id: category_ids[6]
   },
   {
     prod_name: "HP Brown Sauce 450g",
     description: "The famous HP brown sauce, great on meats or as an additive to a stew or casserole.",
     price: 229,
     stock: 15,
     category_id: category_ids[6]
   },
   {
     prod_name: "Yume Nishiki Short Grain Rice 5kg",
     description: "This premium quality rice is large-grained and fluffy in texture, with the classic stickiness that makes Japanese short grain rice so easy to mould into sushi.",
     price: 2099,
     stock: 1,
     category_id: category_ids[10]
   },
   {
     prod_name: "Organic Hulled Millet 1kg",
     description: "Organic hulled millet is a versatile small grain that can be used in place of couscous or rice at mealtimes. Millet has a mild, slightly sweet flavour that can complement almost any recipe.",
     price: 371,
     stock: 10,
     category_id: category_ids[10]
   },
   {
     prod_name: "Red Kidney Beans 2kg",
     description: "Red kidney beans, an excellent addition to stews or casseroles.",
     price: 400,
     stock: 12,
     category_id: category_ids[11]
   },
   {
     prod_name: "Pinto Beans 1kg",
     description: "Pinto beans are a great choice for Mexican cuisine. They are excellent when prepared as refried beans.",
     price: 465,
     stock: 12,
     category_id: category_ids[11]
   },
  ]);
};
