exports.seed = function(knex, Promise) {
  return knex('types').then(function() {
    return Promise.all([
      knex('types').insert({name: '1'}),
      knex('types').insert({name: '2'}),
      knex('types').insert({name: '3'}),
    ]);
  });
};
