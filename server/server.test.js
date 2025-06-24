const request = require("supertest");
const app = require("./server");

describe("Weather API", () => {
  test("weather fetching with valid city", async () => {
    const response = await request(app).get("/api/weather").query({ city: "London" });
    expect(response.statusCode).toBe(200);
    expect(response.body.city).toBe("London");
    expect(response.body).toHaveProperty("temperature");
    expect(response.body).toHaveProperty("condition");
    expect(response.body).toHaveProperty("humidity");
  });
});

describe("Input validation", () => {
  test("should return 400 status and error message for empty city parameter", async () => {
    const response = await request(app).get("/api/weather").query({ city: "" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
  test("should return 400 if city query is missing entirely", async () => {
    const response = await request(app).get("/api/weather");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  test("should return 404 status and error message for non-existent/not found city", async () => {
    const response = await request(app).get("/api/weather").query({ city: "NonExistentCity" });
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
