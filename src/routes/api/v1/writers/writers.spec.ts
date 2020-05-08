import request from "supertest";
import app from "../../../../index";

describe("/api/v1/writers", () => {
  it("should return a status of 200", async () => {
    let response = await request(app).get("/api/v1/writers");
    expect(response.status).toBe(200);
  });
});
