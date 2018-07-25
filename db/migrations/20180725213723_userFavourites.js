exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user_fav', function(table) {
      table.integer('map_id');
      table.integer('user_id');
      table
        .foreign('map_id')
        .references('id')
        .inTable('maps');
      table
        .foreign('user_id')
        .references('id')
        .inTable('users');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('user_fav')]);
};
