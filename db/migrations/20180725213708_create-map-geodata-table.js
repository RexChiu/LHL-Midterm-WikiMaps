exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("map_geodata", function(table) {
      table.increments("id").primary();
      table.integer("map_id");
      table
        .foreign("map_id")
        .references("id")
        .inTable("maps");
      table.integer("point_id");
      table
        .foreign("point_id")
        .references("id")
        .inTable("maps");
      table.float("lat");
      table.float("lng");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("map_geodata")]);
};
