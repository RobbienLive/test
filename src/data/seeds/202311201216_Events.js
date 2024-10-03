const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    // first delete all entries
    await knex(tables.inschrijving).delete();
    await knex(tables.scout).delete();
    await knex(tables.group).delete();
    await knex(tables.event).delete();
 

    // then add the fresh events
    await knex(tables.event).insert([
      {
        EventID: 1,
        EventName: 'Leidingsavond',
        StartDate: '2023-10-10',
        EndDate: '2023-10-10',
        Location: 'Brussel',
        Adress: 'Oude Graanmarkt 5, 1000 Brussel',
        StartTime: '18:00',
        EndTime: '23:00',
        Price: 7,
        MaximumParticipants: 100,
      },
      {
        EventID: 2,
        EventName: 'Avioth',
        StartDate: '2024-02-07',
        EndDate: '2024-02-12',
        Location: 'Avioth',
        Adress: '5 Rue de l\'Abbé Delhotel, 55600 Avioth, Frankrijk',
        StartTime: '17:30',
        EndTime: '13:00',
        Price: 5,
        MaximumParticipants: 300,
      },
      {
        EventID: 3,
        EventName: 'Leidingsavond',
        StartDate: '2024-03-17',
        EndDate: '2024-03-17',
        Location: 'Antwerpen',
        Adress: 'Grote Markt 1, 2000 Antwerpen',
        StartTime: '19:00',
        EndTime: '23:00',
        Price: 10,
        MaximumParticipants: 75,
      },
      {
        EventID: 4,
        EventName: 'WIM',
        StartDate: '2024-04-24',
        EndDate: '2024-04-26',
        Location: 'Oudenaarde',
        Adress: 'Markt 1, 9700 Oudenaarde',
        StartTime: '18:00',
        EndTime: '13:00',
        Price: 70,
        MaximumParticipants: 125,
      },
    ]);
  },
};
