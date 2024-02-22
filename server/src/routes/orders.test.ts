import request from "supertest";
import Order from "../models/order.model";
import sequelize from "../models/database";
import app from "../app";

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

describe("Orders API", () => {
  it("should get all orders", async () => {
    const order = { brand: "foo", name: "bar", quantity: 1, price: 1.4 };
    await Order.create(order);
    const response = await request(app).get("/orders");
    expect(response.status).toBe(200);
    expect(response.body[response.body.length - 1]).toMatchObject(order);
  });

  it("should create a new order", async () => {
    const order = {
      brand: "Cool brand",
      name: "Sneakers",
      quantity: 10,
      price: 100,
    };
    const response = await request(app).post("/orders").send(order);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toMatchObject(order);
  });

  it("should return validation errors", async () => {
    const order = { brand: "", name: "", quantity: 0.1, price: -12 };
    const response = await request(app).post("/orders").send(order);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);
  });

  it("should update an existing order", async () => {
    const order = await Order.create({
      brand: "old",
      name: "name",
      quantity: 10,
      price: 100,
    });
    const updatedOrder = {
      brand: "New",
      name: "NewName",
      quantity: 10,
      price: 100,
    };
    const response = await request(app)
      .put(`/orders/${order.get("id")}`)
      .send(updatedOrder);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", order.get("id"));
    expect(response.body).toMatchObject(updatedOrder);
  });

  it("should delete an existing order", async () => {
    const order = await Order.create({
      brand: "old",
      name: "name",
      quantity: 10,
      price: 100,
    });
    const response = await request(app).delete(`/orders/${order.get("id")}`);
    expect(response.status).toBe(204);
  });

  it("should return 404 for non-existing order", async () => {
    const response = await request(app).get("/orders/-122");
    expect(response.status).toBe(404);
  });
});
