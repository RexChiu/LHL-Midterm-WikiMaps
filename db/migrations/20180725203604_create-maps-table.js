exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("maps", function(table) {
      table.increments("id").primary();
      table.string("name");
      table.string("url");
      table.string("desc");
      table.boolean("public");
      table.integer("rating");
      table
        .integer("type_id")
        .references("id")
        .inTable("types");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("maps")]);
};
