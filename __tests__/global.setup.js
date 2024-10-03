const config = require("config");
const { initializeLogger } = require("../src/core/logging");
const { initializeData, getKnex, tables } = require("../src/data");

module.exports = async () => {
  initializeLogger({
    level: config.get("log.level"),
    disabled: config.get("log.disabled"),
  });
  await initializeData();

  const knex = getKnex();

  await knex(tables.group).insert([
    {
      GroupID: 1,
      GroupName: "Geen groep",
      Adress: "",
    },
    {
      GroupID: 2,
      GroupName: "7e Brussel",
      Adress: "Kerkstraat 1, 1000 Brussel",
    },
    {
      GroupID: 3,
      GroupName: "1e Gent",
      Adress: "Kerkstraat 1, 9000 Gent",
    },
    {
      GroupID: 4,
      GroupName: "1e Antwerpen",
      Adress: "Kerkstraat 1, 2000 Antwerpen",
    },
    {
      GroupID: 5,
      GroupName: "1e Brugge",
      Adress: "Kerkstraat 1, 8000 Brugge",
    },
  ]);

  await knex(tables.scout).insert([
    {
      ScoutID: 1,
      LastName: "Van Duysen",
      FirstName: "Robbe",
      DateOfBirth: "2000-10-10",
      Email: "robbe.vanduysen@gmail.com",
      PhoneNumber: "0474123623",
      Adress: "Kerkstraat 1, 1000 Brussel",
      Tak: "groen",
      IsChief: true,
      GroupID: 2,
      Password_hash:
        "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
      Roles: '["user", "admin"]',
    },
    {
      ScoutID: 2,
      LastName: "Van Der Helst",
      FirstName: "Pieter",
      DateOfBirth: "2000-10-10",
      Email: "pieter.vanderhelst@hogent.be",
      PhoneNumber: "0474123623",
      Adress: "Kerkstraat 1, 1000 Brussel",
      Tak: "rood",
      IsChief: false,
      GroupID: 2,
      Password_hash:
        "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
      Roles: '["user"]',
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
      GroupID: 1,
      Password_hash:
        '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
      Roles: '["user"]',
    },
  ]);

  await knex(tables.event).insert([
    {
      EventID: 1,
      EventName: "Leidingsavond",
      StartDate: "2023-10-10",
      EndDate: "2023-10-10",
      Location: "Brussel",
      Adress: "Oude Graanmarkt 5, 1000 Brussel",
      StartTime: "18:00",
      EndTime: "23:00",
      Price: 7,
      MaximumParticipants: 100,
    },
    {
      EventID: 2,
      EventName: "Avioth",
      StartDate: "2024-02-07",
      EndDate: "2024-02-12",
      Location: "Avioth",
      Adress: "5 Rue de l'Abbé Delhotel, 55600 Avioth, Frankrijk",
      StartTime: "17:30",
      EndTime: "13:00",
      Price: 5,
      MaximumParticipants: 300,
    },
    {
      EventID: 3,
      EventName: "Leidingsavond",
      StartDate: "2024-03-17",
      EndDate: "2024-03-17",
      Location: "Antwerpen",
      Adress: "Grote Markt 1, 2000 Antwerpen",
      StartTime: "19:00",
      EndTime: "23:00",
      Price: 10,
      MaximumParticipants: 75,
    },
    {
      EventID: 4,
      EventName: "WIM",
      StartDate: "2024-04-24",
      EndDate: "2024-04-26",
      Location: "Oudenaarde",
      Adress: "Markt 1, 9700 Oudenaarde",
      StartTime: "18:00",
      EndTime: "13:00",
      Price: 70,
      MaximumParticipants: 125,
    },
  ]);
  await knex(tables.inschrijving).insert([
    {
      InschrijvingID: 1,
      EventID: 1,
      ScoutID: 1,
    },
    {
      InschrijvingID: 2,
      EventID: 1,
      ScoutID: 2,
    },
    {
      InschrijvingID: 4,
      EventID: 2,
      ScoutID: 1,
    },
    {
      InschrijvingID: 5,
      EventID: 2,
      ScoutID: 2,
    },
  ]);
};
