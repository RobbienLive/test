const { withServer, login, loginAdmin } = require("../supertest.setup"); // 👈 2 en 3
const { testAuthHeader } = require("../common/auth");

describe("Health", () => {
  let authHeaderAdmin;
  let authHeader;
  let server;
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

  const url = "/api/health";

  describe("GET /api/health", () => {
    it("should return 200 and pong", async () => {
      const response = await request.get(`${url}/ping`);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ pong: true });
    });

    it("should return Env, version and name", async () => {
      const response = await request.get(`${url}/version`);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        env: "test",
        version: "1.0.0",
        name: "2324-webservices-robbienlivestudent",
      });
    });
  });
});
