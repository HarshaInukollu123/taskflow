import request from "supertest";
import app from "../server.js";
import { connectDB, disconnectDB } from "./setupTestDB.js";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe("Authentication API Tests", () => {
  test("Should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "John Doe",
        email: "john@example.com",
        password: "pass123",
      });

    expect(res.status).toBe(201);
    expect(res.body.user).toHaveProperty("email", "john@example.com");
  });

  test("Should not register a user with the same email", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "John Doe",
        email: "john@example.com",
        password: "pass123",
      });

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Jane Doe",
        email: "john@example.com", // Same email
        password: "pass456",
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("User already exists");
  });
});
