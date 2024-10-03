module.exports = {
  port: 9000,
  log: {
    level: "silly",
    disabled: false,
  },
  cors: {
    origins: ["https://two324-frontendweb-robbienlivestudent.onrender.com"],
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: "mysql2",
  },
  auth: {
    argon: {
      saltLength: 16,
      hashLength: 32,
      timeCost: 6,
      memoryCost: 2 ** 17,
    },
    jwt: {
      expirationInterval: 60 * 60 * 1000, // ms (1 hour)
      issuer: "esgb.hogent.be",
      audience: "esgb.hogent.be",
    },
  },
};
