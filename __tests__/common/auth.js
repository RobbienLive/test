const testAuthHeader = (requestFactory) => {
  test("it should 401 when no authorization token provided", async () => {
    const response = await requestFactory();

    expect(response.statusCode).toBe(500);
  });

  test("it should 401 when invalid authorization token provided", async () => {
    const response = await requestFactory().set(
      "Authorization",
      "INVALID TOKEN"
    );

    expect(response.statusCode).toBe(500);
  });
};

module.exports = {
  testAuthHeader,
};
