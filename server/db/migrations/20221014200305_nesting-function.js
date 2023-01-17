exports.up = function(knex) {
    return knex.schema
        .raw(
            `
            CREATE OR REPLACE FUNCTION category_tree(_cat_id int)
                RETURNS jsonb
                LANGUAGE sql STABLE PARALLEL SAFE AS
            $func$
            SELECT jsonb_agg(subquery)
            FROM (
                SELECT cat.id, cat.cat_name, category_tree(cat.id) as children
                FROM product_categories pc
                JOIN product_categories cat ON pc.id = cat.parent_id
                WHERE pc.id = _cat_id
                ORDER BY cat.id
            ) subquery
            $func$
            `
        )
};

exports.down = function(knex) {
    return (
        knex.schema
            .raw(`DROP FUNCTION IF EXISTS category_tree`)
    )
};
