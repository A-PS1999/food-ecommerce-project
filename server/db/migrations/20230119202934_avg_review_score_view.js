exports.up = function(knex) {
    return knex.schema.raw(
        `
        CREATE MATERIALIZED VIEW average_rating
        AS
        SELECT products.id AS id, AVG(reviews.rating) AS avg_rating
        FROM reviews
        JOIN products ON reviews.product_id = products.id
        GROUP BY products.id
        WITH NO DATA
        `
    )
};

exports.down = function(knex) {
    return (
        knex.schema.raw(`DROP MATERIALIZED VIEW IF EXISTS average_rating`)
    )
};
