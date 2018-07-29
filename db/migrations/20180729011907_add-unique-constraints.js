exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function(table) {
      table.unique('url');
    }),
    knex.schema.table('points', function(table) {
      table.unique('url');
    }),
    knex.schema.table('types', function(table) {
      table.unique('name');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function(table) {
      table.dropUnique('url');
    }),
    knex.schema.table('points', function(table) {
      table.dropUnique('url');
    }),
    knex.schema.table('types', function(table) {
      table.dropUnique('name');
    })
  ]);
};
