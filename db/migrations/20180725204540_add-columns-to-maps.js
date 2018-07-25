exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("maps", function(table) {
      table.float("start_lat");
      table.float("start_lng");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("maps", function(table) {
      table.dropColumn("start_lat");
      table.dropColumn("start_lng");
    })
  ]);
};
