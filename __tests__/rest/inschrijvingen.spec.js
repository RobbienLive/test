const { withServer, login, loginAdmin } = require("../supertest.setup"); // 👈 2 en 3
const { testAuthHeader } = require("../common/auth");

describe("Inschrijvingen", () => {
  let server;
  let request;
  let knex;
  let authHeaderAdmin;
  let authHeader;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  });

  beforeAll(async () => {
    authHeader = await login(request);
    authHeaderAdmin = await loginAdmin(request);
  });

  const url = "/api/events/inschrijvingen";

  describe("GET /api/events/inschrijvingen/:id", () => {
    it("should return 200 when logged in as Admin", async () => {
      const response = await request
        .get(`${url}/2`)
        .set("Authorization", authHeaderAdmin);
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          InschrijvingID: 4,
          ScoutID: 1,
          EventID: 2,
          EventName: "Avioth",
          StartDate: "2024-02-06T23:00:00.000Z",
          EndDate: "2024-02-11T23:00:00.000Z",
          Location: "Avioth",
          Adress: "5 Rue de l'Abbé Delhotel, 55600 Avioth, Frankrijk",
          StartTime: "17:30:00",
          EndTime: "13:00:00",
          Price: 5,
          MaximumParticipants: 300,
        },
        {
          InschrijvingID: 5,
          ScoutID: 2,
          EventID: 2,
          EventName: "Avioth",
          StartDate: "2024-02-06T23:00:00.000Z",
          EndDate: "2024-02-11T23:00:00.000Z",
          Location: "Avioth",
          Adress: "5 Rue de l'Abbé Delhotel, 55600 Avioth, Frankrijk",
          StartTime: "17:30:00",
          EndTime: "13:00:00",
          Price: 5,
          MaximumParticipants: 300,
        },
      ]);
    });
    it("should return 500 when logged in as User", async () => {
      const response = await request
        .get(`${url}/2`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(500);
    });
    it("should return 400 when ID is not a number", async () => {
      const response = await request
        .get(`${url}/test`)
        .set("Authorization", authHeaderAdmin);
      expect(response.status).toBe(400);
    });
    testAuthHeader(() => request.get(`${url}/2`));
  });

  describe("GET /api/events/inschrijvingen/scout/", () => {
    it("should return 200 if it's the same ID as user", async () => {
      const response = await request
        .get(`${url}/scout`)
        .set("Authorization", authHeaderAdmin);
      expect(response.status).toBe(200);
      expect(response.body.items).toEqual([
        {
          InschrijvingID: 1,
          EventID: 1,
          EventName: "Leidingsavond",
          StartDate: "2023-10-09T22:00:00.000Z",
          EndDate: "2023-10-09T22:00:00.000Z",
          Location: "Brussel",
          Adress: "Oude Graanmarkt 5, 1000 Brussel",
          StartTime: "18:00:00",
          EndTime: "23:00:00",
          Price: 7,
          MaximumParticipants: 100,
        },
        {
          InschrijvingID: 4,
          EventID: 2,
          EventName: "Avioth",
          StartDate: "2024-02-06T23:00:00.000Z",
          EndDate: "2024-02-11T23:00:00.000Z",
          Location: "Avioth",
          Adress: "5 Rue de l'Abbé Delhotel, 55600 Avioth, Frankrijk",
          StartTime: "17:30:00",
          EndTime: "13:00:00",
          Price: 5,
          MaximumParticipants: 300,
        },
      ]);
    });
    testAuthHeader(() => request.get(`${url}/scout`));
  });

  describe("POST /api/events/inschrijvingen", () => {
    const newInschrijving = {
      EventID: 1,
      ScoutID: 1,
    };
    it("should return 200 when logged in as user", async () => {
      const response = await request
        .post(`${url}`)
        .set("Authorization", authHeader)
        .send(newInschrijving);
      expect(response.status).toBe(200);
      expect(response.body.InschrijvingID).toBeDefined();
      expect(response.body.InschrijvingID).toBeGreaterThan(0);
      expect(response.body.EventID).toBe(1);
      expect(response.body.ScoutID).toBe(1);
    });
    testAuthHeader(() => request.post(`${url}`).send(newInschrijving));
  });

  describe("DELETE /api/events/inschrijvingen/:id", () => {
    it("should return 204 when logged in as user", async () => {
      const response = await request
        .delete(`${url}/scout/2`)
        .set("Authorization", authHeader)
        .send();
      expect(response.status).toBe(204);
    });
    testAuthHeader(() => request.delete(`${url}/scout/1`));
  });
});
