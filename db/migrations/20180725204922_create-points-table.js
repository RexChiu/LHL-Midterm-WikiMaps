exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("points", function(table) {
      table.increments("id").primary();
      table
        .integer("map_id")
        .references("id")
        .inTable("maps");
      table.string("title");
      table.string("desc");
      table.string("img_url");
      table.integer("rating");
      table.float("lat");
      table.float("lng");
      table.string("addr");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("points")]);
};
