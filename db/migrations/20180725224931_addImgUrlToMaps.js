exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function(table) {
      table.string('img_url');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function(table) {
      table.dropColumn('img_url');
    })
  ]);
};
