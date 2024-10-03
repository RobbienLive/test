const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    // first delete all entries 
    

    // then add the fresh groups
    await knex(tables.group).insert([
      {
        GroupID: 1,
        GroupName: 'Geen groep',
        Adress: '',
      },
      {
        GroupID: 2,
        GroupName: '7e Brussel',
        Adress: 'Kerkstraat 1, 1000 Brussel',
      },
      {
        GroupID: 3,
        GroupName: '1e Gent',
        Adress: 'Kerkstraat 1, 9000 Gent',
      },
      {
        GroupID: 4,
        GroupName: '1e Antwerpen',
        Adress: 'Kerkstraat 1, 2000 Antwerpen',
      },
      {
        GroupID: 5,
        GroupName: '1e Brugge',
        Adress: 'Kerkstraat 1, 8000 Brugge',
      }

    ]);
  },
};
