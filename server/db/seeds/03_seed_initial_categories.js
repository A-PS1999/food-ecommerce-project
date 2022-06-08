exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('product_categories').del()
  await knex('product_categories').insert([
    { id: 1, cat_name: "Food" },
    { id: 2, cat_name: "Drink" },
    { id: 3, cat_name: "Seasonings", parent_id: 1 },
    { id: 4, cat_name: "Herbs", parent_id: 3 },
    { id: 5, cat_name: "Spices", parent_id: 3 },
    { id: 6, cat_name: "Condiments", parent_id: 1 },
    { id: 7, cat_name: "Table Sauces", parent_id: 6 },
    { id: 8, cat_name: "Oils, Vinegars & Dressings", parent_id: 6 },
    { id: 9, cat_name: "Cooking Sauces & Pastes", parent_id: 6 },
    { id: 10, cat_name: "Grains & Pulses", parent_id: 1 },
    { id: 11, cat_name: "Rice & Grains", parent_id: 5 },
    { id: 12, cat_name: "Pulses", parent_id: 5 },
    { id: 13, cat_name: "Snacks & Sweets", parent_id: 1 },
    { id: 14, cat_name: "Savoury Snacks & Nuts", parent_id: 13 },
    { id: 15, cat_name: "Sweet Snacks", parent_id: 13 },
    { id: 16, cat_name: "Pasta & Noodles", parent_id: 1 },
    { id: 17, cat_name: "Pasta", parent_id: 16 },
    { id: 18, cat_name: "Noodles", parent_id: 16 },
    { id: 19, cat_name: "Tea, Coffee & Hot Drinks", parent_id: 2 },
    { id: 20, cat_name: "Tea", parent_id: 19 },
    { id: 21, cat_name: "Coffee", parent_id: 19 },
    { id: 22, cat_name: "Hot Chocolate", parent_id: 19 },
    { id: 23, cat_name: "Soft Drinks", parent_id: 2 },
    { id: 24, cat_name: "Preserved Foods", parent_id: 1 },
    { id: 25, cat_name: "Tinned Foods", parent_id: 24 },
    { id: 26, cat_name: "Jars & Pickles", parent_id: 24 }
  ]);
};
