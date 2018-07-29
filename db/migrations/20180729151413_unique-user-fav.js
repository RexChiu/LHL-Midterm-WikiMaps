exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('user_fav', function(table) {
      table.unique(['map_id', 'user_id']);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('user_fav', function(table) {
      table.dropUnique(['map_id', 'user_id']);
    })
  ]);
};
