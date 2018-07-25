exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function(table) {
      table.integer('user_id');
      table
        .foreign('user_id')
        .references('id')
        .inTable('users');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function(table) {
      table.dropColumn('user_id');
    })
  ]);
};
