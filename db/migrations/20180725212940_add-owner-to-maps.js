exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("maps", function(table) {
      table
        .foreign("user_id")
        .references("id")
        .inTable("users");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("maps", function(table) {
      table.dropColumn("user_id");
    })
  ]);
};
