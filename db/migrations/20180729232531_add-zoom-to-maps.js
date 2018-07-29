exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function(table) {
      table.integer('zoom');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function(table) {
      table.dropColumn('zoom');
    })
  ]);
};
