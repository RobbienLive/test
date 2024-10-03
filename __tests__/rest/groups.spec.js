const { withServer, login, loginAdmin } = require("../supertest.setup"); // 👈 2 en 3
const { testAuthHeader } = require("../common/auth");

describe("Groups", () => {
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

  const url = "/api/groups";

  describe("GET /api/groups", () => {
    it("should return 200 and a list of all the groups", async () => {
      const response = await request.get(url);
      expect(response.body.items.length).toBe(5);
      expect(response.status).toBe(200);
      expect(response.body.items[0]).toEqual({
        GroupID: 1,
        GroupName: "Geen groep",
        Adress: "",
      });
      expect(response.body.items[1]).toEqual({
        GroupID: 2,
        GroupName: "7e Brussel",
        Adress: "Kerkstraat 1, 1000 Brussel",
      });
      expect(response.body.items[2]).toEqual({
        GroupID: 3,
        GroupName: "1e Gent",
        Adress: "Kerkstraat 1, 9000 Gent",
      });
      expect(response.body.items[3]).toEqual({
        GroupID: 4,
        GroupName: "1e Antwerpen",
        Adress: "Kerkstraat 1, 2000 Antwerpen",
      });
      expect(response.body.items[4]).toEqual({
        GroupID: 5,
        GroupName: "1e Brugge",
        Adress: "Kerkstraat 1, 8000 Brugge",
      });
    });
  });

  describe("GET /api/groups/:id", () => {
    it("should return 200 and the group with the given id", async () => {
      const response = await request.get(`${url}/2`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        GroupID: 2,
        GroupName: "7e Brussel",
        Adress: "Kerkstraat 1, 1000 Brussel",
      });
    });

    it("should return 500 if the group with the given id does not exist", async () => {
      const response = await request.get(`${url}/999`);
      expect(response.status).toBe(500);
      expect(response.error.message).toEqual(
        "cannot GET /api/groups/999 (500)"
      );
      expect(response.text).toEqual("Internal Server Error");
    });
  });

  describe("POST /api/groups", () => {
    const newGroup = {
      GroupName: "1e Leuven",
      Adress: "Kerkstraat 1, 3000 Leuven",
    };
    it("should return 201 and the created group", async () => {
      const response = await request
        .post(`${url}`)
        .send(newGroup)
        .set("Authorization", authHeaderAdmin);
      expect(response.status).toBe(200);
      expect(response.body.GroupID).toBeDefined();
      expect(response.body.GroupID).toBeGreaterThan(0);
      expect(response.body.GroupName).toBe("1e Leuven");
      expect(response.body.Adress).toBe("Kerkstraat 1, 3000 Leuven");
    });

    it("should return 500 if a user tries it", async () => {
      const response = await request
        .post(`${url}`)
        .send(newGroup)
        .set("Authorization", authHeader);
      expect(response.status).toBe(500);
    });

    testAuthHeader(() => request.post(`${url}`).send(newGroup));
  });

  describe("PUT /api/groups/:id", () => {
    const updatedGroup = {
      GroupName: "1e Leuven",
      Adress: "Kerkstraat 1, 3000 Leuven",
    };
    it("should return 200 and the updated group", async () => {
      const response = await request
        .put(`${url}/5`)
        .send(updatedGroup)
        .set("Authorization", authHeaderAdmin);
      expect(response.status).toBe(200);
      expect(response.body.GroupID).toBe(5);
      expect(response.body.GroupName).toBe("1e Leuven");
      expect(response.body.Adress).toBe("Kerkstraat 1, 3000 Leuven");
    });

    it("should return 500 if a user tries it", async () => {
      const response = await request
        .put(`${url}/5`)
        .send(updatedGroup)
        .set("Authorization", authHeader);
      expect(response.status).toBe(500);
    });

    testAuthHeader(() => request.put(`${url}/5`).send(updatedGroup));
  });

  describe("DELETE /api/groups/:id", () => {
    it("should return 200 and the deleted group", async () => {
      const response = await request
        .delete(`${url}/5`)
        .set("Authorization", authHeaderAdmin);
      expect(response.status).toBe(204);
    });

    it("should return 500 if a user tries it", async () => {
      const response = await request
        .delete(`${url}/5`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(500);
    });

    testAuthHeader(() => request.delete(`${url}/5`));
  });
});
