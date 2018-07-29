exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.raw('ALTER TABLE maps ALTER COLUMN img_url TYPE varchar(2000)')]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.raw('ALTER TABLE maps ALTER COLUMN img_url TYPE varchar(255)')]);
};
