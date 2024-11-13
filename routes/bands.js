const express = require("express");
const bands = express.Router();
const Band = require("../models/Band");

const Musician = require("../models/Musician");

bands.get("/", async (req, res) => {
  const musicians = await Band.findAll({
    include: [
      {
        model: Musician,
        as: "musicians",
      },
    ],
  });
  res.json(musicians);
});

bands.get("/:id", async (req, res) => {
  try {
    const band = await Band.findByPk(req.params.id);
    res.json(band);
  } catch (error) {
    res.json(error);
  }
});

module.exports = bands;