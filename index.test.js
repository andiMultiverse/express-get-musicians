// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const { seedMusician } = require("./seedData");

describe("./musicians endpoint", () => {
  test("GET request gets all musicians", async () => {
    const response = await request(app).get("/musicians");
    const responseData = JSON.parse(response.text);
    expect(responseData).toHaveLength(seedMusician.length);
    expect(response.statusCode).toBe(200);
  });
  test("Get a single musician by id", async () => {
    const response = await request(app).get("/musicians/1");
    const responseData = JSON.parse(response.text);
    expect(responseData.name).toBe("Mick Jagger");
    expect(response.statusCode).toBe(200);
  });

  test("POST request creates a new musician", async () => {
    const newMusician = {
      name: "Freddie Mercury",
      instrument: "Vocals",
    };
    const response = await request(app).post("/musicians").send(newMusician);
    const responseData = JSON.parse(response.text);
    expect(responseData.name).toBe("Freddie Mercury");
    expect(response.statusCode).toBe(201);
  });
  
  test("PUT request updates a musician", async () => {
    const newMusician = {
      name: "Freddie Mercury",
      instrument: "Vocals",
    };
    const response = await request(app).put("/musicians/1").send(newMusician);
    const responseData = JSON.parse(response.text);
    expect(responseData.name).toBe("Freddie Mercury");
  });

  test("DELETE musician by id", async () => {
    const response = await request(app).delete("/musicians/1");
    const responseData = JSON.parse(response.text);
    expect(responseData.message).toBe("Musician with id 1 deleted");
    expect(response.statusCode).toBe(200);
  });
});
