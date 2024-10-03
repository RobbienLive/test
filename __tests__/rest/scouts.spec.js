const { withServer, login, loginAdmin } = require("../supertest.setup"); // 👈 2 en 3
const { testAuthHeader } = require("../common/auth");

describe.only("Scouts", () => {
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

  const url = "/api/scouts";
  describe("GET /api/scouts", () => {
    it("should return 200 and a list of all the scouts", async () => {
      const response = await request
        .get(url)
        .set("Authorization", authHeaderAdmin);
      expect(response.body.items.length).toBe(3);
      expect(response.status).toBe(200);
      expect(response.body.items[2]).toEqual({
        ScoutID: 1,
        LastName: "Van Duysen",
        FirstName: "Robbe",
        DateOfBirth: "2000-10-09T22:00:00.000Z",
        Email: "robbe.vanduysen@gmail.com",
        PhoneNumber: "0474123623",
        Adress: "Kerkstraat 1, 1000 Brussel",
        Tak: "groen",
        IsChief: 1,
        GroupID: 2,
        Roles: ["user", "admin"],
      });
      expect(response.body.items[1]).toEqual({
        ScoutID: 2,
        LastName: "Van Der Helst",
        FirstName: "Pieter",
        DateOfBirth: "2000-10-09T22:00:00.000Z",
        Email: "pieter.vanderhelst@hogent.be",
        PhoneNumber: "0474123623",
        Adress: "Kerkstraat 1, 1000 Brussel",
        Tak: "rood",
        IsChief: 0,
        GroupID: 2,
        Roles: ["user"],
      });
    });

    it("should return 500 when a user tries it", async () => {
      const response = await request.get(url).set("Authorization", authHeader);
      expect(response.status).toBe(500);
    });
    testAuthHeader(() => request.get(`${url}`));
  });

  describe("GET /api/scouts/:id", () => {
    it("should return 200 and a scout", async () => {
      const response = await request
        .get(`${url}/2`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ScoutID: 2,
        LastName: "Van Der Helst",
        FirstName: "Pieter",
        DateOfBirth: "2000-10-09T22:00:00.000Z",
        Email: "pieter.vanderhelst@hogent.be",
        PhoneNumber: "0474123623",
        Adress: "Kerkstraat 1, 1000 Brussel",
        Tak: "rood",
        IsChief: 0,
        GroupID: 2,
        Roles: ["user"],
      });
    });

    it("should return 403 when the scout does not exist", async () => {
      const response = await request
        .get(`${url}/999`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(403);
    });

    it("should return 403 when a user tries a id that is not from theirself", async () => {
      const response = await request
        .get(`${url}/1`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(403);
    });

    it("should return 403 when the id is not valid", async () => {
      const response = await request
        .get(`${url}/a`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(403);
    });
    testAuthHeader(() => request.get(`${url}/1`));
  });

  describe("POST /api/scouts", () => {
    const newScout = {
      LastName: "De Vos",
      FirstName: "Karine",
      DateOfBirth: "2000-10-10",
      Email: "karine.samyn@hogent.be",
      PhoneNumber: "0474123623",
      Adress: "Kerkstraat 1, 1000 Brussel",
      Tak: "rood",
      IsChief: false,
      GroupID: 3,
      Password: "123456789",
    };

    it("should return 200 and a new scout", async () => {
      const response = await request.post(`${url}`).send(newScout);

      expect(response.status).toBe(200);
      expect(response.body.ScoutID).toBeDefined();
      expect(response.body.ScoutID).toBeGreaterThan(0);
      expect(response.body.LastName).toBe("De Vos");
      expect(response.body.FirstName).toBe("Karine");
      expect(response.body.DateOfBirth).toBe("2000-10-09T22:00:00.000Z");
      expect(response.body.Email).toBe("karine.samyn@hogent.be");
      expect(response.body.PhoneNumber).toBe("0474123623");
      expect(response.body.Adress).toBe("Kerkstraat 1, 1000 Brussel");
      expect(response.body.Tak).toBe("rood");
      expect(response.body.IsChief).toBe(0);
      expect(response.body.GroupID).toBe(3);
      expect(response.body.Roles).toEqual(["user"]);
    });
  });

  describe("PUT /api/scouts/:id", () => {
    const updatedScout = {
      LastName: "De Vos",
      FirstName: "Karine",
      DateOfBirth: "2000-10-10",
      Email: "pieter.vanderhelst@hogent.be",
      PhoneNumber: "0474123623",
      Adress: "Kerkstraat 1, 1000 Brussel",
      Tak: "rood",
      IsChief: false,
      GroupID: 3,
    };
    it("should return 200 and a updated scout", async () => {
      const response = await request
        .put(`${url}/2`)
        .send(updatedScout)
        .set("Authorization", authHeader);
      expect(response.status).toBe(200);
    });

    it("should return 403 when the scout does not exist", async () => {
      const response = await request
        .put(`${url}/999`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(403);
    });

    it("should return 403 when a user tries a id that is not from theirself", async () => {
      const response = await request
        .put(`${url}/1`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(403);
    });

    it("should return 403 when the id is not valid", async () => {
      const response = await request
        .put(`${url}/a`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(403);
    });

    testAuthHeader(() => request.put(`${url}/2`));
  });

  describe("DELETE /api/scouts/:id", () => {
    it("should return 204", async () => {
      const response = await request
        .delete(`${url}/3`)
        .set("Authorization", authHeaderAdmin);
      expect(response.status).toBe(204);
    });
    it("should return 500 when the scout does not exist", async () => {
      const response = await request
        .delete(`${url}/999`)
        .set("Authorization", authHeaderAdmin);
      expect(response.status).toBe(500);
    });
    it("should return 500 when a user tries it", async () => {
      const response = await request
        .delete(`${url}/3`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(500);
    });
    it("should return 400 when the id is not valid", async () => {
      const response = await request
        .delete(`${url}/a`)
        .set("Authorization", authHeaderAdmin);
      expect(response.status).toBe(400);
    });
    testAuthHeader(() => request.delete(`${url}/3`));
  });

  describe("GET /api/scouts/group/:id", () => {
    it("should return 200 and a list of all the scouts of a group", async () => {
      const response = await request
        .get(`${url}/group/2`)
        .set("Authorization", authHeaderAdmin);
      expect(response.body.items.length).toBe(1);
      expect(response.status).toBe(200);
      expect(response.body.items[0]).toEqual({
        ScoutID: 1,
        LastName: "Van Duysen",
        FirstName: "Robbe",
        DateOfBirth: "2000-10-09T22:00:00.000Z",
        Email: "robbe.vanduysen@gmail.com",
        PhoneNumber: "0474123623",
        Adress: "Kerkstraat 1, 1000 Brussel",
        Tak: "groen",
        IsChief: 1,
        GroupID: 2,
        Roles: ["user", "admin"],
      });
    });
    testAuthHeader(() => request.get(`${url}/group/2`));
  });
});
