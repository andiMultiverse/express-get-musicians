const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.get("/musicians", async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

app.get("/musicians/:id", async (req, res) => {
  const id = req.params.id;
  const musician = await Musician.findByPk(id);
  res.json(musician);
});

app.put("/musicians/:id", async (req, res) => {
  const newMusician = req.body;
  await Musician.update(newMusician, {
    where: {
      id: req.params.id,
    },
  });
  res.json(newMusician);
});

app.post("/musicians", async (req, res) => {
  const newMusician = req.body;
  const musician = await Musician.create(newMusician);

  res.status(201).json(musician);
});

app.delete("/musicians/:id", async (req, res) => {
  try {
    await Musician.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: `Musician with id ${req.params.id} deleted`,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
