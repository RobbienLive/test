const { tables } = require('..');
const Role = require('../../core/roles');

module.exports = {
  seed: async (knex) => {
    // then add the fresh scouts
    await knex(tables.scout).insert([
      {
        ScoutID: 1,
        LastName: 'Van Duysen',
        FirstName: 'Robbe',
        DateOfBirth: '2000-10-10',
        Email: 'robbe.vanduysen@gmail.com',
        PhoneNumber: '0474123623',
        Adress: 'Kerkstraat 1, 1000 Brussel',
        Tak: 'groen',
        IsChief: true,
        GroupID: 2,
        Password_hash:
          '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        Roles: JSON.stringify([Role.USER, Role.ADMIN]),
      },
      {
        ScoutID: 2,
        LastName: 'Van Der Helst',
        FirstName: 'Pieter',
        DateOfBirth: '2000-10-10',
        Email: 'pieter.vanderhelst@hogent.be',
        PhoneNumber: '0474123623',
        Adress: 'Kerkstraat 1, 1000 Brussel',
        Tak: 'rood',
        IsChief: false,
        GroupID: 2,
        Password_hash:
          '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        Roles: JSON.stringify([Role.USER]),
      },
      {
        ScoutID: 3,
        LastName: 'De Vos',
        FirstName: 'Karine',
        DateOfBirth: '2000-10-10',
        Email: 'karine.samyn@hogent.be',
        PhoneNumber: '0474123623',
        Adress: 'Kerkstraat 1, 1000 Brussel',
        Tak: 'rood',
        IsChief: false,
        GroupID: 3,
        Password_hash:
          '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        Roles: JSON.stringify([Role.USER]),
      },
    ]);
  },
};
