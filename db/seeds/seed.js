exports.seed = function(knex, Promise) {
  // users
  return knex('users')
    .del()
    .then(function() {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alex'}),
        knex('users').insert({id: 2, name: 'Rex'}),
        knex('users').insert({id: 3, name: 'John'}),
      ]);
    });
};
