exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('map_users', function(table) {
      table.unique(['user_id', 'map_id']);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('map_users', function(table) {
      table.dropUnique(['user_id', 'map_id']);
    })
  ]);
};
