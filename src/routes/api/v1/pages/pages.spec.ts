import request from "supertest";
import app from "../../../../app";

describe("/api/v1/pages", () => {
  it("should return a status of 200", async () => {
    let response = await request(app).get("/api/v1/pages");
    expect(response.status).toBe(200);
  });
});
