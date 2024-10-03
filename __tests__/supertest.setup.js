const supertest = require("supertest");
const createServer = require("../src/createServer");
const { getKnex } = require("../src/data");

const login = async (supertest) => {
  const response = await supertest.post("/api/scouts/login").send({
    Email: "pieter.vanderhelst@hogent.be",
    Password: "12345678",
  });
  if (response.statusCode !== 200) {
    throw new Error(response.body.message || "Unknown error occured");
  }

  return `Bearer ${response.body.token}`;
};

const loginAdmin = async (supertest) => {
  const user = {
    Email: "robbe.vanduysen@gmail.com",
    Password: "12345678",
  };
  const response = await supertest.post("/api/scouts/login").send(user);
  if (response.statusCode !== 200) {
    throw new Error(response.body.message || "Unknown error occured");
  }
  return `Bearer ${response.body.token}`;
};

const withServer = (setter) => {
  let server;

  beforeAll(async () => {
    server = await createServer();

    setter({
      knex: getKnex(),
      supertest: supertest(server.getApp().callback()),
    });
  });

  afterAll(async () => {
    await server.stop();
  });
};

module.exports = {
  login,
  loginAdmin,
  withServer,
};
