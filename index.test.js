// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const { seedMusician } = require("./seedData");

describe("GET /musicians", () => {
  test("should return an array of musicians", async () => {
    const fakeMusicians = [
      { name: "John Lennon", instrument: "Guitar" },
      { name: "Paul McCartney", instrument: "Bass" },
    ];

    jest.spyOn(Musician, "findAll").mockResolvedValue(fakeMusicians);

    const response = await request(app).get("/musicians");

    expect(response.body).toEqual(fakeMusicians);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toEqual(fakeMusicians.length);
  });

  test("should return the correct musician data", async () => {
    const fakeMusician = { id: 1, name: "John Lennon", instrument: "Guitar" };

    jest.spyOn(Musician, "findByPk").mockResolvedValue(fakeMusician);

    const response = await request(app).get("/musicians/1");

    expect(response.body).toEqual(fakeMusician);
    expect(response.statusCode).toBe(200);
  });

  test("should create a new musician", async () => {
    const newMusician = { name: "Freddie Mercury", instrument: "Vocals" };

    jest.spyOn(Musician, "create").mockResolvedValue(newMusician);

    const response = await request(app)
      .post("/musicians")
      .send(newMusician);

    expect(response.body).toEqual(newMusician);
    expect(response.statusCode).toBe(200);
  });

  test("should update a musician", async () => {
    const updatedMusician = { name: "Freddie Mercury", instrument: "Vocals" };

    jest.spyOn(Musician, "update").mockResolvedValue(updatedMusician);

    const response = await request(app)
      .put("/musicians/1")
      .send(updatedMusician);

    expect(response.body).toEqual(updatedMusician);
    expect(response.statusCode).toBe(200);
  });

  test("should delete a musician", async () => {
    jest.spyOn(Musician, "destroy").mockResolvedValue(1);

    const response = await request(app)
      .delete("/musicians/1");

    expect(response.statusCode).toBe(200);
  });
});