// for future seeding

exports.seed = function(knex, Promise) {
  return knex('maps')
    .del()
    .then(() => {
      return knex('users').del();
    })
    .then(() => {
      return knex('types').del();
    })
    .then(() => {
      return Promise.all([knex('types').insert({ id: 1, name: '1' }), knex('types').insert({ id: 2, name: '2' })]);
    })
    .then(() => {
      return knex('users').insert({ name: 'cats', username: 'Cats', email: 'Cats@Cats', password: 'Cats' });
    });
};
