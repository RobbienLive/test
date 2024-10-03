const { withServer, login, loginAdmin } = require("../supertest.setup"); // 👈 2 en 3
const { testAuthHeader } = require("../common/auth");

describe("Events", () => {
  let authHeaderAdmin;
  let authHeader;
  let request;
  let knex;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  });

  beforeAll(async () => {
    authHeader = await login(request);
    authHeaderAdmin = await loginAdmin(request);
  });

  const url = "/api/events";

  describe("GET /api/events", () => {
    it("should 200 and return a list of events", async () => {
      const response = await request.get(url);
      expect(response.status).toEqual(200);
      expect(response.body.items.length).toBe(4);
      expect(response.body.items[0]).toEqual({
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
      });
      expect(response.body.items[1]).toEqual({
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
      });
      expect(response.body.items[2]).toEqual({
        EventID: 3,
        EventName: "Leidingsavond",
        StartDate: "2024-03-16T23:00:00.000Z",
        EndDate: "2024-03-16T23:00:00.000Z",
        Location: "Antwerpen",
        Adress: "Grote Markt 1, 2000 Antwerpen",
        StartTime: "19:00:00",
        EndTime: "23:00:00",
        Price: 10,
        MaximumParticipants: 75,
      });
      expect(response.body.items[3]).toEqual({
        EventID: 4,
        EventName: "WIM",
        StartDate: "2024-04-23T22:00:00.000Z",
        EndDate: "2024-04-25T22:00:00.000Z",
        Location: "Oudenaarde",
        Adress: "Markt 1, 9700 Oudenaarde",
        StartTime: "18:00:00",
        EndTime: "13:00:00",
        Price: 70,
        MaximumParticipants: 125,
      });
    });
  });

  describe("GET /api/events/:id", () => {
    // ------------------------------------ 200 ------------------------------------
    it("should 200 and return the event with the given id", async () => {
      const response = await request
        .get(`${url}/1`)
        .set("Authorization", authHeaderAdmin);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
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
      });
    });
    // ------------------------------------ 500 ------------------------------------

    it("should 404 when the event with the given id does not exist", async () => {
      const response = await request.get(`${url}/999`);
      expect(response.status).toBe(500);
      expect(response.error.message).toEqual(
        "cannot GET /api/events/999 (500)"
      );
      expect(response.text).toEqual("Internal Server Error");
    });

    // ------------------------------------ 400 ------------------------------------
    it("should 400 when the id is not a number", async () => {
      const response = await request.get(`${url}/not-a-number`);
      expect(response.status).toBe(400);
    });
  });

  describe("POST /api/events", () => {
    const newEvent = {
      EventName: "WIM",
      StartDate: "2024-04-24",
      EndDate: "2024-04-26",
      Location: "Oudenaarde",
      Adress: "Markt 1, 9700 Oudenaarde",
      StartTime: "18:00",
      EndTime: "13:00",
      Price: 70,
      MaximumParticipants: 125,
    };
    it("should 201 and return the created event", async () => {
      const response = await request
        .post(url)
        .send(newEvent)
        .set("Authorization", authHeaderAdmin);

      expect(response.status).toBe(200);
      expect(response.body.EventID).toBeDefined();
      expect(response.body.EventID).toBeGreaterThan(0);

      expect(response.body.EventName).toBe("WIM");
      expect(response.body.StartDate).toBe("2024-04-23T22:00:00.000Z");
      expect(response.body.EndDate).toBe("2024-04-25T22:00:00.000Z");
      expect(response.body.Location).toBe("Oudenaarde");
      expect(response.body.Adress).toBe("Markt 1, 9700 Oudenaarde");
      expect(response.body.StartTime).toBe("18:00:00");
      expect(response.body.EndTime).toBe("13:00:00");
      expect(response.body.Price).toBe(70);
      expect(response.body.MaximumParticipants).toBe(125);
    });

    it("should 500 when a user tries it", async () => {
      const response = await request
        .post(url)
        .send(newEvent)
        .set("Authorization", authHeader);
      expect(response.status).toBe(500);
    });

    testAuthHeader(() => request.post(url).send(newEvent));
  });

  describe("PUT /api/events/:id", () => {
    const updatedEvent = {
      EventName: "WIM",
      StartDate: "2024-04-24",
      EndDate: "2024-04-26",
      Location: "Oudenaarde",
      Adress: "Markt 1, 9700 Oudenaarde",
      StartTime: "18:00",
      EndTime: "13:00",
      Price: 70,
      MaximumParticipants: 125,
    };

    // ------------------------------------ 200 ------------------------------------
    it("should 200 and return the updated event", async () => {
      const response = await request
        .put(`${url}/1`)
        .send(updatedEvent)
        .set("Authorization", authHeaderAdmin);

      expect(response.status).toBe(200);
      expect(response.body.EventID).toBe(1);
      expect(response.body.EventName).toBe("WIM");
      expect(response.body.StartDate).toBe("2024-04-23T22:00:00.000Z");
      expect(response.body.EndDate).toBe("2024-04-25T22:00:00.000Z");
      expect(response.body.Location).toBe("Oudenaarde");
      expect(response.body.Adress).toBe("Markt 1, 9700 Oudenaarde");
      expect(response.body.StartTime).toBe("18:00:00");
      expect(response.body.EndTime).toBe("13:00:00");
      expect(response.body.Price).toBe(70);
      expect(response.body.MaximumParticipants).toBe(125);
    });
    it("should 500 when a user tries it", async () => {
      const response = await request
        .put(`${url}/1`)
        .send(updatedEvent)
        .set("Authorization", authHeader);
      expect(response.status).toBe(500);
    });
    testAuthHeader(() => request.put(`${url}/1`).send(updatedEvent));
  });

  describe("DELETE /api/events/:id", () => {
    // ------------------------------------ 200 ------------------------------------
    it("should 204 and return the deleted event", async () => {
      const response = await request
        .delete(`${url}/4`)
        .set("Authorization", authHeaderAdmin);
      expect(response.status).toBe(204);
    });

    // ------------------------------------ 500 ------------------------------------
    it("should 500 when a user tries it", async () => {
      const response = await request
        .delete(`${url}/4`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(500);
    });
    testAuthHeader(() => request.delete(`${url}/4`));
  });
});
