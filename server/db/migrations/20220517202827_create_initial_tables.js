exports.up = function(knex) {
  return knex.schema
    .createTable("users", (table) => {
        table.increments('id', { primaryKey: true });
        table.text("name").notNullable();
        table.text("password_hash").notNullable();
        table.text("email").unique().notNullable();
        table.boolean("is_admin").defaultTo(false);
    })
    .createTable("sessions", (table) => {
        table.string('sid').notNullable().primary();
        table.json('sess').notNullable();
        table.timestamp('expire', { useTz: true }).notNullable();
    })
    .createTable("addresses", (table) => {
        table.increments('id', { primaryKey: true });
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("users.id");
        table.text("address_line1").notNullable();
        table.text("address_line2").notNullable();
        table.text("city").notNullable();
        table.text("post_code").notNullable();
        table.text("country").unsigned().notNullable();
        table.text("phone_no").notNullable();
    })
    .createTable("product_categories", (table) => {
        table.increments('id', { primaryKey: true });
        table.text("cat_name").unique().notNullable();
        table.integer("parent_id").unsigned();
        table.foreign("parent_id").references("product_categories.id");
    })
    .createTable("products", (table) => {
        table.increments('id', { primaryKey: true });
        table.text("prod_name").notNullable();
        table.text("description");
        table.integer("price").notNullable();
        table.integer('stock').unsigned().notNullable();
        table.integer("category_id").unsigned().notNullable();
        table.foreign("category_id").references("product_categories.id");
        table.timestamps(true, true);
    })
    .createTable("product_images", (table) => {
        table.increments('id', { primaryKey: true });
        table.string("image_url").notNullable();
        table.integer("product_id").unsigned().notNullable();
        table.foreign("product_id").references("products.id");
    })
    .createTable("orders", (table) => {
        table.increments('id', { primaryKey: true });
        table.integer("total_price").notNullable();
        table.enu('status', ['payment_due', 'processing', 'cancelled', 'paid_for'], { useNative: true, enumName: 'order_status' });
        table.integer("address_id").unsigned().notNullable();
        table.foreign("address_id").references("addresses.id");
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("users.id");
        table.timestamps(true, true);
    })
    .createTable("order_items", (table) => {
        table.increments('id', { primaryKey: true });
        table.integer("quantity").notNullable();
        table.integer("product_id").unsigned().notNullable();
        table.foreign("product_id").references("products.id");
        table.integer("order_id").unsigned().notNullable();
        table.foreign("order_id").references("orders.id");
        table.timestamps(true, true);
    })
    .createTable("shipping", (table) => {
        table.increments('id', { primaryKey: true });
        table.enu("type", ['standard', 'express', { useNative: true, enumName: 'order_status' }]);
        table.enu("status", ['processing', 'canceled', 'shipped', 'delayed', 'delivered'], { useNative: true, enumName: 'shipping_status' });
        table.integer("order_id").unsigned().notNullable();
        table.foreign("order_id").references("orders.id");
        table.timestamps(true, true);
    })
    .createTable("reviews", (table) => {
        table.increments('id', { primaryKey: true });
        table.integer('rating').notNullable();
        table.text("review_body").notNullable();
        table.integer("product_id").unsigned().notNullable();
        table.foreign("product_id").references("products.id");
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("users.id");
        table.timestamps(true, true);
    })
    .createTable("wishlist", (table) => {
        table.increments('id', { primaryKey: true });
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("users.id");
        table.integer("product_id").unsigned().notNullable();
        table.foreign("product_id").references("products.id");
    })
};

exports.down = function(knex) {
  return (
      knex.schema
        .dropTable("wishlist")
        .dropTable("reviews")
        .dropTable("shipping")
        .dropTable("order_items")
        .dropTable("orders")
        .dropTable("product_images")
        .dropTable("products")
        .dropTable("product_categories")
        .dropTable("addresses")
        .dropTable("sessions")
        .dropTable("users")
  )
};
