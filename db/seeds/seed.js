// for future seeding

exports.seed = function(knex, Promise) {
  return knex('points')
    .del()
    .then(() => {
      return knex('user_fav').del();
    })
    .then(() => {
      return knex('maps').del();
    })
    .then(() => {
      return knex('types').del();
    })
    .then(() => {
      return knex('users').del();
    })
    .then(() => {
      return Promise.all([
        knex('types').insert([
          { name: 'Cats' },
          { name: 'Restaurants' },
          { name: 'Schools' },
          { name: 'Attractions' },
          { name: 'Malls' },
          { name: 'Hiding Spots' },
          { name: 'Cat Shelters' },
          { name: 'Buried Treasure' }
        ])
      ]);
    })
    .then(() => {
      return knex('users').insert({ name: 'Cats', username: 'Cats', email: 'Cats@Cats', password: 'Cats' });
    });
};
